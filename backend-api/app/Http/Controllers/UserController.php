<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class UserController extends Controller
{
    public function updateProfile(Request $request)
{
    $user = Auth::user();

    $request->validate([
        'username' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'phone' => 'nullable|string|max:20',
        'club_name' => 'nullable|string|max:255',
        'sponsor_name' => 'nullable|string|max:255',
        'avatar' => 'nullable|string', // Base64 image string
    ]);

    // Update user details
    $user->username = $request->username;
    $user->email = $request->email;
    $user->phone = $request->phone;
    $user->club_name = $request->club_name;
    $user->sponsor_name = $request->sponsor_name;

    // Handle Base64 Image Upload
    if ($request->avatar) {
        $image = $request->avatar;

        // Log received image string (for debugging)
        \Log::info('Received base64 image: ' . substr($image, 0, 50)); // Log only first 50 characters

        // Check if the image is valid base64 format
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $matches)) {
            $imageType = strtolower($matches[1]); // jpg, png, etc.

            // Validate allowed image types
            if (!in_array($imageType, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                return response()->json(['message' => 'Unsupported image type: ' . $imageType], 400);
            }

            // Remove base64 prefix
            $image = substr($image, strpos($image, ',') + 1);
            $image = base64_decode($image);

            // Check if decoding was successful
            if ($image === false) {
                return response()->json(['message' => 'Invalid base64 encoding'], 400);
            }

            // Generate a unique file name
            $fileName = 'profile_' . $user->id . '_' . time() . '.' . $imageType;
            $filePath = 'profile_pictures/' . $fileName;

            // Store the file in storage/app/public/profile_pictures
            Storage::disk('public')->put($filePath, $image);

            // Delete old profile picture if exists
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }

            // Update the database
            $user->profile_picture = $filePath;
        } else {
            return response()->json(['message' => 'Invalid image format'], 400);
        }
    }

    // Save user data
    $user->save();

    return response()->json([
        'message' => 'Profile updated successfully',
        'profile_picture' => asset('storage/' . $user->profile_picture),
    ]);
}

public function updatePassword(Request $request)
{
    $user = Auth::user();

    $request->validate([
        'oldPassword' => 'required',
        'newPassword' => 'required|min:6|confirmed',
    ]);

    if (!Hash::check($request->oldPassword, $user->password)) {
        return response()->json(['message' => 'Old password is incorrect'], 400);
    }

    $user->update(['password' => Hash::make($request->newPassword)]);

    return response()->json(['message' => 'Password updated successfully']);
}

public function getCaptain($user_id)
{
    $captain = User::find($user_id);

    if (!$captain) {
        return response()->json(['error' => 'Captain not found'], 404);
    }

    return response()->json([
        'name' => $captain->username,
        'totalMatches' => $captain->total_matches,
        'won' => $captain->matches_won,
        'loss' => $captain->matches_loss,
        'imageUrl' => $captain->profile_picture,
    ]);
}
}
