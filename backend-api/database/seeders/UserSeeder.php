<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::create([
            'username' => 'bilal',
            'email' => 'bilal@gmail.com',
            'password' => bcrypt('password'),
            'total_matches' => 100,
            'matches_won' => 70,
            'matches_loss' => 30,
            'profile_picture' => 'https://example.com/captain.jpg',
        ]);
    }
}
