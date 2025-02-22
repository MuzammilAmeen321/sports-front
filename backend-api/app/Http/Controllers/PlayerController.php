<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use App\Models\User;
use App\Models\Team;
class PlayerController extends Controller
{
    public function getPlayers($team_id)
    {
        $players = Player::where('team_id', $team_id)->get();

        if ($players->isEmpty()) {
            return response()->json(['error' => 'No players found'], 404);
        }

        $formattedPlayers = $players->map(function ($player) {
            return [
                'name' => $player->name,
                'role' => $player->role,
                'totalMatches' => $player->total_matches,
                'won' => $player->matches_won,
                'loss' => $player->matches_loss,
                'imageUrl' => $player->image_url,
            ];
        });

        return response()->json($formattedPlayers);
    }
}
