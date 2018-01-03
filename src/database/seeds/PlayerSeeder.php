<?php

use Illuminate\Database\Seeder;
use App\Player;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $players = ['mav', 'stefanos', 'stergos', 'marinos', 'mihalis'];
        foreach($players as $playerName){
            Player::create([
                'name' => $playerName,
            ]);
        }
    }
}
