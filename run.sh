#!/usr/bin/env bash
cd /var/www/html
php artisan migrate:fresh --seed
php artisan serve --host=0.0.0.0 --port=$APP_PORT