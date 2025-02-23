<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // User Registration
    public function register(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|email|unique:users',
            'phone' => 'required|string|max:15',
            'password' => 'required|string|min:6',
            'player_code' => 'nullable|string|unique:users,player_code', // Ensure player_code is unique
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
    
        // Generate a unique player code if not provided
        $playerCode = $request->player_code;
        if (!$playerCode) {
            $playerCode = $this->generateUniquePlayerCode($request->username);
        }
    
        // Create the user
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'player_code' => $playerCode, // Save the player code
            'profile_picture' => $request->profile_picture ?? null,
            'club_name' => $request->club_name ?? null,
            'sponsor_name' => $request->sponsor_name ?? null,
            'total_matches' => $request->total_matches ?? 0,
            'matches_won' => $request->matches_won ?? 0,
            'matches_loss' => $request->matches_loss ?? 0,
            'role' => $request->role ?? 'player', // Default role is 'player'
        ]);
    
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'player_code' => $playerCode, // Return the generated player code
        ], 201);
    }

    // Generate a unique player code
    private function generateUniquePlayerCode($username)
    {
        $prefix = strtoupper(substr($username, 0, 3)); // First 3 letters of the username
        $randomDigits = mt_rand(1000, 9999); // Random 4-digit number
        $playerCode = $prefix . $randomDigits;

        // Check if the player code already exists
        while (User::where('player_code', $playerCode)->exists()) {
            $randomDigits = mt_rand(1000, 9999); // Regenerate random digits
            $playerCode = $prefix . $randomDigits;
        }

        return $playerCode;
    }

    // Check if a player code is unique
    public function checkPlayerCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $exists = User::where('player_code', $request->code)->exists();

        return response()->json(['exists' => $exists], 200);
    }

    // User Login
    public function login(Request $request)
    {
        // Validate login request
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Attempt to log in
        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // Get authenticated user
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ], 200);
    }

    // User Logout
    public function logout(Request $request)
    {
        // Revoke user's token
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
} 