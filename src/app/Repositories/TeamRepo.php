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


/**
 *
 * returns team related information like team id etc
 *
 * Class TeamRepo
 * @package App\Repositories
 */
class TeamRepo
{
    public $playersArr;
    public $gameType;
    public $playerHash;
    public $teamId;
    public $teamPlayers;

    /**
     * TeamRepo constructor.
     * @param array $playersArr
     * @param string $gameType
     */
    public function __construct($playersArr, $gameType)
    {
        $this->playersArr = $playersArr;
        $this->gameType = $gameType;
        $this->teamPlayers = [];
        $this->getTeam();
        $this->getTeamPlayers();
    }

    /**
     * populate the team players
     */
    private function getTeamPlayers(){
        $tp = TeamPlayer::where('team_id', $this->teamId)->get();
        //print_r($tp);die;
        foreach($tp as $key=>$player){
           $this->teamPlayers[] = $player->player_id;
        }
    }

    /**
     *
     * get the team id
     *
     * @return void
     */
    private function getTeam(){
        $this->getCleanPlayers();
        $this->getPlayersHash();
        $team = Team::where('team_hash', $this->playerHash)->first();
        if(!$team){
            $this->teamId =  $this->setTeam();
        }else{
            $this->teamId =  $team->id;
        }
    }

    /**
     *
     * clean the players arr from null values
     *
     * @return void
     */
    private function getCleanPlayers(){
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
     * @return integer
     */
    private function setTeam(){
        $this->getPlayersHash();
        $team = Team::create(['team_type' => $this->gameType, 'team_hash' => $this->playerHash]);
        foreach($this->playersArr as $key=>$player){
            TeamPlayer::create(['player_id' => $player, 'team_id' => $team->id]);
        }
        return $team->id;
    }

    /**
     * @return void
     */
    private function getPlayersHash(){
        sort($this->playersArr);
       // print_r($this->playersArr);
        $this->playerHash = md5(implode(":", $this->playersArr));
       // echo $this->playerHash."\n";
    }

}