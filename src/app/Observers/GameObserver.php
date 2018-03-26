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
        $this->getTeam([$game->team_1_player_1, $game->team_1_player_2], $game->game_type);
        $this->getTeam([$game->team_2_player_1, $game->team_2_player_2], $game->game_type);
    }

    /**
     *
     * get the team id
     *
     * @param $playersArr
     * @param $game_type
     * @return null
     */
    private function getTeam($playersArr,$game_type){
        $playersArr = $this->getCleanPlayers($playersArr);

        $teams = TeamPlayer::where('player_id', $playersArr)->get();
        if(count($teams)===0){
            // does not exist create
            return $this->setTeam($playersArr, $game_type);
        }else{ // team may exist check various team ids
            foreach($teams as $team){
                $match = TeamPlayer::where('player_id', $playersArr)->where('team_id', $team->id)->first();
                if($match){
                    return $match->id;
                }
            }
            //  no match create
            return $this->setTeam($playersArr, $game_type);
        }
    }

    /**
     *
     * clean the players arr
     *
     * @param $playersArr
     * @return mixed
     */
    private function getCleanPlayers($playersArr){
        // remove null
        foreach($playersArr as $key=>$player){
            if($player === null){
                unset($playersArr[$key]);
            }
        }
        return $playersArr;
    }

    private function setTeam($players, $game_type){
        $team = Team::create(['team_type' => $game_type]);
        foreach($players as $key=>$player){
            TeamPlayer::create(['player_id' => $player, 'team_id' => $team->id]);
        }
        return $team->id;
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