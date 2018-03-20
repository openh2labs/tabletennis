FROM php:7.1-fpm

RUN pecl install redis-3.1.2 \
    && pecl install xdebug-2.5.5 \
    && docker-php-ext-enable redis xdebug

RUN apt-get update && apt-get install -y --no-install-recommends \
            curl \
            build-essential \
            libfreetype6-dev \
            libjpeg62-turbo-dev \
            libmcrypt-dev \
            libpng12-dev \
            freetds-dev \
            unixodbc-dev \
            vim \
            openssh-client \
            git \
            apt-transport-https \
            vim \
    && docker-php-ext-install -j$(nproc) iconv mcrypt \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install -j$(nproc) \
            pdo_mysql \
            zip

# CLEAN UP
RUN apt-get clean \
    && rm -r /var/lib/apt/lists/* \
    && rm -rf /tmp/pear

#LARAVEL PHP-FPM ----------------------------------------------------------------------------------------------
COPY ./docker-config/php-fpm/conf/laravel.conf /usr/local/etc/php-fpm.d/laravel.conf

#LARAVEL ------------------------------------------------------------------------------------------------------
ENV INITRD No
ENV LANG en_US.UTF-8


# Get composer & run
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN /usr/bin/curl -sS https://getcomposer.org/installer |/usr/local/bin/php \
    && /bin/mv composer.phar /usr/local/bin/composer

# Nginx config
COPY ./docker-config/nginx/conf.d/ /etc/nginx/conf.d/

# SOURCE CODE  ----------------------------------------------------------------------------------------------
COPY ./src/ /var/www/html/

# NODE SOURCE CODE COPY----------------------------------------------------------------------------------------------
COPY ./node/ /home/node/app/

# COMPOSER ----------------------------------------------------------------------------------------------
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN /usr/local/bin/composer self-update \
    && cd /var/www/html \
    && /usr/local/bin/composer update

# SET FILE PERMISSION --------------------------------------------------------------------------------------
RUN chown -R :www-data /var/www/html \
 && chmod -R ug+rwx /var/www/html/storage /var/www/html/bootstrap/cache
# THESE VOLUMES are shares with nginx container using "volumes_from"

RUN cd ~ \
    && curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install nodejs \
    && cd /var/www/html/ \
    && npm install \
    && npm run development

VOLUME ["/etc/nginx/conf.d/", "/var/www/html/", "/home/node/app/"]