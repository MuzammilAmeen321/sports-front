<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Gate;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with('user')->get();
        return response()->json($teams);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'pin' => 'required|string|unique:teams,pin',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('team_logos', 'public');
        }
    
        $team = Team::create([
            'name' => $request->name,
            'address' => $request->address,
            'city' => $request->city,
            'pin' => $request->pin,
            'logo' => $logoPath,
            'user_id' => $request->user()->id, // Set the user_id
            'created_by' => $request->user()->id, // Set the created_by field
        ]);
    
        return response()->json([
            'message' => 'Team created successfully!',
            'team' => $team,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $team = Team::findOrFail($id);

        // Authorize the action using a policy
        if (Gate::denies('update', $team)) {
            return response()->json(['message' => 'You are not authorized to update this team.'], 403);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:255',
            'pin' => 'sometimes|string|unique:teams,pin,' . $team->id,
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $logoPath = $this->handleLogoUpload($request, $team->logo);

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

       

        try {
            if ($team->logo) {
                Storage::disk('public')->delete($team->logo);
            }

            $team->delete();

            return response()->json(['message' => 'Team deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the team.'], 500);
        }
    }

    /**
     * Handle logo upload.
     *
     * @param Request $request
     * @param string|null $oldLogoPath
     * @return string|null
     */
    private function handleLogoUpload(Request $request, $oldLogoPath = null)
    {
        if ($request->hasFile('logo')) {
            if ($oldLogoPath && Storage::disk('public')->exists($oldLogoPath)) {
                Storage::disk('public')->delete($oldLogoPath);
            }
            return $request->file('logo')->store('team_logos', 'public');
        }

        return $oldLogoPath;
    }
}