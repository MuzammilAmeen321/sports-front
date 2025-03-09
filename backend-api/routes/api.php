<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\ScoreboardController;
use App\Http\Controllers\ContactController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes (No authentication required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/check-player-code', [AuthController::class, 'checkPlayerCode']);
// Protected routes (Require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user-profile', function (Request $request) {
        return response()->json($request->user());
    });

    // User routes
    Route::post('/update-profile', [UserController::class, 'updateProfile']);
    Route::post('/update-password', [UserController::class, 'updatePassword']);
    Route::get('/captain/{id}', [UserController::class, 'getCaptain']);
    // Fetch users based on search query
Route::get('/all-users', [UserController::class, 'fetchPlayerToAddInTeam']);
// Fetch more users for pagination
Route::get('/more-users', [UserController::class, 'fetchMorePlayersToAdd']);

    // Teams routes
    Route::prefix('teams')->group(function () {
        Route::get('/', [TeamController::class, 'index']); // Get all teams
        Route::post('/', [TeamController::class, 'store']); // Store a new team
        Route::post('/{id}', [TeamController::class, 'update']); // Update an existing team
        Route::delete('/{id}', [TeamController::class, 'destroy']); // Delete a team
        Route::get('/{id}/players', [PlayerController::class, 'getPlayers']);
        Route::delete('/{team}/players/{player}', [PlayerController::class, 'removePlayer']);
        Route::put('/teams/{id}/change-captain', [TeamController::class, 'changeCaptain']);
    });

    Route::post('/add-user-to-team', [PlayerController::class, 'addUserToTeam']);
    Route::get('/matches', [MatchController::class, 'index']);
    Route::post('/matches', [MatchController::class, 'store']);

    Route::get('/scoreboard', [ScoreboardController::class, 'getScoreboardData']);
    Route::post('/contact', [ContactController::class, 'store']);
});