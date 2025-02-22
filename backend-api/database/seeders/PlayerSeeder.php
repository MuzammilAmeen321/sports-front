<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Player;
class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Player::create([
            'name' => 'Virat Kohli',
            'role' => 'Batsman',
            'total_matches' => 250,
            'matches_won' => 180,
            'matches_loss' => 70,
            'image_url' => 'https://example.com/virat-kohli.jpg',
            'team_id' => 1,
        ]);

        Player::create([
            'name' => 'MS Dhoni',
            'role' => 'Wicketkeeper-Batsman',
            'total_matches' => 350,
            'matches_won' => 250,
            'matches_loss' => 100,
            'image_url' => 'https://example.com/ms-dhoni.jpg',
            'team_id' => 1,
        ]);
    }
}
