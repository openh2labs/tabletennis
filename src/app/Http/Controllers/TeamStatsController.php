<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Repositories\TeamRepo;

class TeamStatsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $payload = $request->all();
        $result = $this->getInitial($payload);
        return response()->json($result, 201);
    }

    /**
     *
     * get a collection of db results
     *
     * @param $team1
     * @param $team2
     * @return mixed
     */
    private function getWins($team1, $team2){
        return  DB::table('game')
            ->select(DB::raw('team_won, count(*) as total'))
            ->wherein('team_won', [$team1, $team2])
            ->groupBy('team_won')
            ->get();

    }

    private function getPlayers($payload){
        return [
            'team_1' => [$payload['team1P1'], $payload['team1P2']],
            'team_2' => [$payload['team2P1'], $payload['team2P2']]
        ];
    }

    //@todo move to a repo
    private function getInitial($payload){
        if(array_key_exists('team_1_id', $payload) && array_key_exists('team_2_id', $payload)){
            $wins = $this->getWins($payload['team_1_id'], $payload['team_2_id']);
        }elseif(array_key_exists('team1P1', $payload) && array_key_exists('team1P2', $payload) && array_key_exists('team2P1', $payload) && array_key_exists('team2P2', $payload) && array_key_exists('gameType', $payload)){
            $parr =  $this->getPlayers($payload);
            $tr1 = new TeamRepo($parr['team_1'], $payload['gameType']);
            $tr2 = new TeamRepo($parr['team_2'], $payload['gameType']);
            $wins = $this->getWins($tr1->teamId, $tr2->teamId);
        }

        $result = $this->getPCT($wins);
        return $result;
    }

    //@todo move to a repo
    private function getPCT($wins){
        $result = $this->getInitialArr($wins);
        $totalGames = $wins[0]->total + $wins[1]->total;
        $result[$wins[1]->team_won]['lost'] = $wins[0]->total;
        $result[$wins[0]->team_won]['lost'] = $wins[1]->total;

        if($totalGames > 0){
            $result[$wins[1]->team_won]['win_pct'] = number_format($wins[1]->total / $totalGames * 100, 0);
            $result[$wins[0]->team_won]['win_pct'] = number_format($wins[0]->total / $totalGames * 100, 0);
            $result[$wins[1]->team_won]['lost_pct'] = number_format($wins[0]->total / $totalGames * 100);
            $result[$wins[0]->team_won]['lost_pct'] = number_format($wins[1]->total / $totalGames * 100);
        }
        return $result;
    }

    /**
     * 
     * get initial values
     * 
     * @param $wins
     * @return array
     */
    private function getInitialArr($wins){
        return [
            $wins[0]->team_won => [
                'win' => $wins[0]->total,
                'lost' => 0,
                'win_pct' => 0,
                'lost_pct' => 0
            ],
            $wins[1]->team_won => [
                'win' => $wins[1]->total,
                'lost' => 0,
                'win_pct' => 0,
                'lost_pct' => 0
            ],
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
