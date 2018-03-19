<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use \App\Player;
use \App\Game;

class importcsv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tabletennis:import:csv';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'import google doc scores to the db';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $csv = $this->getLines(Storage::get('doubles.csv'));
        print_r($csv);
    }

    private function getLines($file)
    {
        $lines = explode("\n", $file);
        foreach ($lines as $key => $line) {
            $lines[$key] = explode(',', $line);
            $this->processRow($lines[$key]);
        }
        return $lines;
    }

    private function processRow($csvRow)
    {
        $data  = ['game_type' => 'single'];
        $team1P = $this->getPlayer($csvRow[1]);
        $data['team_1_player_1'] = $team1P[0];
        if(count($team1P)>1){
            $data['team_1_player_2'] = $team1P[1];
            $data['game_type'] = "doubles";
        }
        $team2P = $this->getPlayer($csvRow[2]);
        $data['team_2_player_1'] = $team2P[0];
        if(count($team2P)>1){
            $data['team_2_player_2'] = $team2P[1];
        }
        $data['team_1_score'] = $csvRow[3];
        $data['team_2_score'] = $csvRow[4];

        $player = Game::create($data);
    }

    /**
     * get players for a team
     */
    private function getPlayer($playerNameStr)
    {
        $result = [];
        $playersArr = $this->getPlayerName($playerNameStr);
        foreach($playersArr as $playerName){
            try {
                $player = Player::where('name', $playerName)->firstOrFail();
            } catch (\Exception $e) {
                $player = Player::create(['name' => $playerName]);
            }
            $result[] = $player->id;
        }
        return $result;
    }


    /**
     * get player names
     */
    private function getPlayerName($playerName)
    {
        $playerNameArr = explode(" ", $playerName);
        foreach($playerNameArr as $key=>$value){
            if($value === ""){
                unset($playerNameArr[$key]);
            }
        }
        if(count($playerNameArr) > 2){
            $this->error("still too many players :-(");
            print_r($playerNameArr);
            die;
        }
        return $playerNameArr;
    }

}
