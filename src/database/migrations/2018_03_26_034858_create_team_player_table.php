<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeamPlayerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('team_player', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('player_id');
            $table->integer('team_id');
            $table->timestamps();
            $table->unique(['player_id', 'team_id']);
        });


        //add the additional columns to game table
        Schema::table('game', function (Blueprint $table) {
            $table->integer('team_1_id')->nullable()->comment('team id 1');
            $table->integer('team_2_id')->nullable()->comment('team id 2');
            $table->integer('team_won')->nullable()->comment('team id that won');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('team_player');
    }
}
