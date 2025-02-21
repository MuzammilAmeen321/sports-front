<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    public function index()
    {
        return response()->json(Team::all());
    }

    use Illuminate\Support\Facades\Validator;

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'pin' => 'required|string',
            'logo' => 'nullable|image|max:2048'
        ]);
    
        if ($validator->fails()) { // ✅ Now this works correctly
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Process the request if validation passes
        $team = Team::create($request->all());
    
        return response()->json(['message' => 'Team created successfully', 'team' => $team], 201);
    }
    
    
    

    public function destroy($id)
    {
        $team = Team::findOrFail($id);
        if ($team->logo) {
            Storage::disk('public')->delete($team->logo);
        }
        $team->delete();

        return response()->json(['message' => 'Team deleted successfully']);
    }
}
