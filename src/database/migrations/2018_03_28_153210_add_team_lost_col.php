<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\Game;

class AddTeamLostCol extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('game', function (Blueprint $table) {
            $table->integer('team_lost')->nullable();
        });

        $games = Game::all();
        foreach($games as $game){
            $game->team_lost = $this->getTeamLost($game);
            $game->save();
        }
    }

    private function getTeamLost(Game $game){
        if($game->team_1_score > $game->team_2_score){
            return $game->team_2_id;
        }else{
            return $game->team_1_id;
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('game', function (Blueprint $table) {
            $table->dropColumn('team_lost');
        });
    }
}
