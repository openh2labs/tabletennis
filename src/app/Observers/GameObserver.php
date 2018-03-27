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
     *
     * get the team id
     *
     * @param $playersArr
     * @param $game_type
     * @return null
     */
    private function getTeam($playersArr,$game_type){
        $playersArr = $this->getCleanPlayers($playersArr);
        $md5 = $this->getPlayersHash($playersArr);
        $team = Team::where('team_hash', $md5)->first();
        if(!$team){
            return $this->setTeam($playersArr, $game_type);
        }else{
            return $team->id;
        }
    }

    /**
     * @param $players
     * @return string
     */
    private function getPlayersHash($players){
        sort($players);
        return md5(implode(":", $players));
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

    /**
     *
     * create the team in the db
     *
     * @param $players
     * @param $game_type
     * @return mixed
     */
    private function setTeam($players, $game_type){
        $team = Team::create(['team_type' => $game_type, 'team_hash' => $this->getPlayersHash($players)]);
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