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
        $match = Matches::create($request->all());
        return response()->json($match, 201);
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
