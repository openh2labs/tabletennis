<?php
/**
 * Created by PhpStorm.
 * User: mavperi
 * Date: 26/03/2018
 * Time: 20:27
 */

namespace App\Observers;

use App\Game;
use App\Team;
use App\TeamPlayer;

class GameObserver
{
    /**
     * Listen to the Game created event.
     *
     * @param  \App\Game  $game
     * @return void
     */
    public function created(Game $game)
    {
        $team1Id = $this->getTeam([$game->team_1_player_1, $game->team_1_player_2], $game->game_type);
        $team2Id =  $this->getTeam([$game->team_2_player_1, $game->team_2_player_2], $game->game_type);

        $game->team_1_id = $team1Id;
        $game->team_2_id = $team2Id;
        $game->team_won = $this->getWinningTeam($game);
        $game->save();
    }

    /**
     *
     * get the winning team
     *
     * @param $game
     * @return mixed
     */
    private function getWinningTeam($game){
        if($game->team_1_score > $game->team_2_score){
            return $game->team_1_id;
        }else{
            return $game->team_2_id;
        }
    }







    /**
     * Listen to the Game deleting event.
     *
     * @param  \App\Game  $game
     * @return void
     */
    public function deleting(Game $game)
    {
        //
    }
}