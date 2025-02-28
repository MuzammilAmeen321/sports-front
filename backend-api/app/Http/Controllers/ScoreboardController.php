<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ScoreboardController extends Controller
{
    public function getScoreboardData()
    {
        $scoreboardData = [
            'date' => '10th Feb 2025',
            'location' => 'National Stadium',
            'toss' => 'Team A won the toss and elected to bat',
            'teamA' => 'Team A',
            'teamB' => 'Team B',
            'score' => '145/6',
            'batting' => [
                ['player' => 'Player 1 (B)', 'runs' => 45, 'balls' => 38, 'fours' => 5, 'sixes' => 2],
                ['player' => 'Player 2 (L)', 'runs' => 30, 'balls' => 25, 'fours' => 3, 'sixes' => 1],
                ['player' => 'Player 3 (R)', 'runs' => 20, 'balls' => 18, 'fours' => 2, 'sixes' => 0],
            ],
            'bowling' => [
                ['bowler' => 'Bowler 1', 'overs' => 4, 'runsGiven' => 30, 'wickets' => 2, 'dotBalls' => 10],
                ['bowler' => 'Bowler 2', 'overs' => 5, 'runsGiven' => 28, 'wickets' => 1, 'dotBalls' => 12],
                ['bowler' => 'Bowler 3', 'overs' => 6, 'runsGiven' => 40, 'wickets' => 3, 'dotBalls' => 14],
            ],
        ];

        return response()->json($scoreboardData);
    }
}
