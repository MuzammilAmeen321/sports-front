<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Matches;
class MatchController extends Controller
{
    public function index()
    {
        $matches = Matches::all();
        return response()->json($matches);
    }

    public function store(Request $request) {
        // Validate Input
        $validated = $request->validate([
            'category' => 'required|string',
            'security' => 'required|in:yes,no',
            'security_amount' => 'required_if:security,yes|nullable|integer',

            'match_bid' => 'nullable|string',
            'match_datetime' => 'required|date',
            'ball_type' => 'required|string',
            'venue' => 'required|string',
            'overs' => 'required|integer',
            'join_code' => 'required|string|unique:matches,join_code'
        ]);

        // Save to database
        $match = Matches::create($validated);

        return response()->json([
            'message' => 'Match created successfully',
            'match' => $validated
        ], 201);
    }

    


    public function update(Request $request, $id)
    {
        $match = Matches::findOrFail($id);
        $match->update($request->all());
        return response()->json($match);
    }

    public function destroy($id)
    {
        Matches::destroy($id);
        return response()->json(null, 204);
    }
}
