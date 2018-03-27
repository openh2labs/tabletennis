<?php
/**
 * Created by PhpStorm.
 * User: mavperi
 * Date: 27/03/2018
 * Time: 21:28
 */

namespace App\Repositories;

use App\TeamPlayer;
use App\Team;


class TeamRepo
{
    public $playersArr;
    public $gameType;
    public $playerHash;

    public function __construct($playersArr, $gameType)
    {
        $this->playersArr = $playersArr;
        $this->gameType = $gameType;
    }

    /**
     *
     * get the team id
     *
     * @param $playersArr
     * @param $game_type
     * @return null
     */
    private function getTeam(){
        $this->playersArr = $this->getCleanPlayers();
        $md5 = $this->getPlayersHash($this->playersArr);
        $team = Team::where('team_hash', $md5)->first();
        if(!$team){
            return $this->setTeam($this->playersArr, $this->gameType);
        }else{
            return $team->id;
        }
    }

    /**
     *
     * clean the players arr
     *
     * @param $playersArr
     * @return mixed
     */
    private function getCleanPlayers(){
        // remove null
        foreach($this->playersArr as $key=>$player){
            if($player === null){
                unset($this->playersArr[$key]);
            }
        }
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
        $this->getPlayersHash();
        $team = Team::create(['team_type' => $game_type, 'team_hash' => $this->playerHash]);
        foreach($players as $key=>$player){
            TeamPlayer::create(['player_id' => $player, 'team_id' => $team->id]);
        }
        return $team->id;
    }

    /**
     * @param $players
     * @return string
     */
    private function getPlayersHash(){
        sort($this->playersArr);
        $this->playerHash = md5(implode(":", $this->playersArr));
    }

}