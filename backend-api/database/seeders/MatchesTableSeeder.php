<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Matches;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
class MatchesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $matches = [
            [
                'match_code' => Str::random(8),
                'home_team' => 'Lahore Qalandars',
                'away_team' => 'Karachi Kings',
                'score' => '120/4',
                'overs' => '10',
                'sport' => 'cricket',
                'ball_type' => 'tape',
                'status' => 'live',
                'league' => 'Pakistan Super League',
                'date' => '2024-03-10',
                'start_time' => '18:00',
                'venue' => 'Gaddafi Stadium',
                'security' => 'High',
                'bid' => '500',
                'image_url' => 'https://example.com/match1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'match_code' => Str::random(8),
                'home_team' => 'Barcelona',
                'away_team' => 'Real Madrid',
                'score' => '2-1',
                'overs' => null,
                'sport' => 'football',
                'ball_type' => null,
                'status' => 'booked',
                'league' => 'La Liga',
                'date' => '2024-04-01',
                'start_time' => '21:00',
                'venue' => 'Camp Nou',
                'security' => 'Medium',
                'bid' => '700',
                'image_url' => 'https://example.com/match2.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'match_code' => Str::random(8),
                'home_team' => 'India',
                'away_team' => 'Pakistan',
                'score' => '160/5',
                'overs' => '20',
                'sport' => 'cricket',
                'ball_type' => 'hard',
                'status' => 'available',
                'league' => 'T20 World Cup',
                'date' => '2024-06-15',
                'start_time' => '19:30',
                'venue' => 'Melbourne Cricket Ground',
                'security' => 'High',
                'bid' => '1000',
                'image_url' => 'https://example.com/match3.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'match_code' => Str::random(8),
                'home_team' => 'Germany',
                'away_team' => 'Argentina',
                'score' => '1-1',
                'overs' => null,
                'sport' => 'football',
                'ball_type' => null,
                'status' => 'live',
                'league' => 'FIFA World Cup',
                'date' => '2024-07-18',
                'start_time' => '20:00',
                'venue' => 'Wembley Stadium',
                'security' => 'Very High',
                'bid' => '1500',
                'image_url' => 'https://example.com/match4.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        DB::table('matches')->insert($matches);
    }
}
