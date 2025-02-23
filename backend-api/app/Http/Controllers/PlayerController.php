<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use App\Models\User;
use App\Models\Team;

class PlayerController extends Controller
{
    public function getPlayers($teamId)
{
    // Fetch players with their roles and user details
    $players = Player::where('team_id', $teamId)
        ->join('users', 'players.user_id', '=', 'users.id')
        ->select('users.*', 'players.role') // Include the role column from players
        ->get();

    return response()->json($players);
}
    public function addUserToTeam(Request $request)
    {
        try {
            $request->validate([
                'userId' => 'required|exists:users,id',
                'teamId' => 'required|exists:teams,id',
            ]);
    
            $team = Team::findOrFail($request->teamId);
            $user = User::findOrFail($request->userId);
    
            // Fetch the player row using team_id and user_id
            $player = Player::where('team_id', $team->id)
                ->where('user_id', $user->id)
                ->first();
    
            // Check if the user is already in the team
            if ($player) {
                return response()->json(['error' => "{$user->username} is already in the team!"], 400);
            }
    
            // Check if the team already has 11 players
            $playerCount = Player::where('team_id', $team->id)->count();
            if ($playerCount >= 11) {
                return response()->json(['error' => "The team already has 11 players. Cannot add more!"], 400);
            }
    
            // Get the created_by value for the team
            $createdBy = $team->created_by;
    
            // Determine the role based on whether the user is the team creator
            $role = ($user->id === $createdBy) ? 'captain' : 'player';
    
            // Add the player to the team with the appropriate role
            Player::create([
                'team_id' => $team->id,
                'user_id' => $user->id,
                'role' => $role, // Assign role here
            ]);
    
            return response()->json(['message' => "{$user->username} has been added to the team as a {$role}!"], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to add user to team: ' . $e->getMessage()], 500);
        }
    }

    public function removePlayer($teamId, $playerId)
    {
        try {
            // Find and delete the player from the team
            Player::where('team_id', $teamId)
                  ->where('user_id', $playerId)
                  ->delete();

            return response()->json([
                'message' => 'Player removed from team successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to remove player from team: ' . $e->getMessage()
            ], 500);
        }
    }
}