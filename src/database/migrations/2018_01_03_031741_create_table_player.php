<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePlayer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('game', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('team_1_player_1');
            $table->bigInteger('team_1_player_2')->nullable();
            $table->bigInteger('team_2_player_1');
            $table->bigInteger('team_2_player_2')->nullable();
            $table->integer('team_1_score')->default(0);
            $table->integer('team_2_score')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player');
        Schema::dropIfExists('game');
    }
}
