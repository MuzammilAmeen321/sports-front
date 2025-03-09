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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'category' => 'required|string',
            'security' => 'required|string',
            'security_amount' => 'nullable|integer',
            'match_bid' => 'required|string',
            'match_datetime' => 'required|date',
            'ball_type' => 'required|string',
            'venue' => 'required|string',
            'overs' => 'required|integer',
            'join_code' => 'required|string',
            'city' => 'required|string',
            'province' => 'required|string'
        ]);

        Matches::create($validated);

        return response()->json(['message' => 'Match created successfully!'], 201);
    }

    public function show($id)
    {
        $match = Matches::findOrFail($id);
        return response()->json($match);
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
