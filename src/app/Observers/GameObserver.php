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
use App\Repositories\TeamRepo;

class GameObserver
{
    private $team_won;
    private $team_lost;

    /**
     * Listen to the Game created event.
     *
     * @param  \App\Game  $game
     * @return void
     */
    public function created(Game $game)
    {
        $team1Idr = new TeamRepo([$game->team_1_player_1, $game->team_1_player_2], $game->game_type);
        $team2Idr = new TeamRepo([$game->team_2_player_1, $game->team_2_player_2], $game->game_type);

        $game->team_1_id = $team1Idr->teamId;
        $game->team_2_id = $team2Idr->teamId;
        $this->getWinningTeam($game);
        $game->team_won = $this->team_won;
        $game->team_lost = $this->team_lost;
        $game->save();
    }

    /**
     *
     * get the winning team
     *
     * @param $game
     */
    private function getWinningTeam(Game $game){
        if($game->team_1_score > $game->team_2_score){
            $this->team_won = $game->team_1_id;
            $this->team_lost = $game->team_2_id;
        }else{
            $this->team_won =  $game->team_2_id;
            $this->team_lost = $game->team_1_id;
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