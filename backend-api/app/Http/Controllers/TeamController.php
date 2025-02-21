<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    public function index()
{
    // Fetch teams with the associated user information
    $teams = Team::with('user')->get();
    return response()->json($teams);
}
    
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'pin' => 'required|string|unique:teams,pin',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
        ]);
    
        // Handle file upload
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('team_logos', 'public'); // Store in public/team_logos
        }
    
        // Create the team with the authenticated user's ID
        $team = Team::create([
            'name' => $request->name,
            'address' => $request->address,
            'city' => $request->city,
            'pin' => $request->pin,
            'logo' => $logoPath,
            'user_id' => $request->user()->id, // Automatically assign the authenticated user's ID
        ]);
    
        return response()->json([
            'message' => 'Team created successfully!',
            'team' => $team,
        ], 201);
    }
    
    public function update(Request $request, $id)
    {
        // Find the team
        $team = Team::findOrFail($id);
    
        // Validate the request
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:255',
            'pin' => 'sometimes|string|unique:teams,pin,' . $team->id,
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
        ]);
    
        // Check if the authenticated user is the creator of the team
        if ($team->user_id !== $request->user()->id) {
            return response()->json(['message' => 'You are not authorized to update this team.'], 403);
        }
    
        // Handle file upload
        $logoPath = $team->logo;
        if ($request->hasFile('logo')) {
            // Delete the old logo if it exists
            if ($logoPath && Storage::disk('public')->exists($logoPath)) {
                Storage::disk('public')->delete($logoPath);
            }
            // Store the new logo
            $logoPath = $request->file('logo')->store('team_logos', 'public');
        }
    
        // Update the team (excluding user_id)
        $team->update([
            'name' => $request->name ?? $team->name,
            'address' => $request->address ?? $team->address,
            'city' => $request->city ?? $team->city,
            'pin' => $request->pin ?? $team->pin,
            'logo' => $logoPath,
        ]);
    
        return response()->json([
            'message' => 'Team updated successfully!',
            'team' => $team,
        ], 200);
    }

public function destroy(Request $request, $id)
{
    $team = Team::findOrFail($id);

    // Check if the authenticated user is the creator of the team
    if ($team->user_id !== $request->user()->id) {
        return response()->json(['message' => 'You are not authorized to delete this team.'], 403);
    }

    // Delete the team logo if it exists
    if ($team->logo) {
        Storage::disk('public')->delete($team->logo);
    }

    // Delete the team
    $team->delete();

    return response()->json(['message' => 'Team deleted successfully']);
}
}
