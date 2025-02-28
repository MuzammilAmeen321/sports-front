<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->string('match_code')->unique();
            $table->string('home_team');
            $table->string('away_team');
            $table->string('score')->nullable();
            $table->string('overs')->nullable();
            $table->enum('sport', ['cricket', 'football', 'hockey', 'kabaddi', 'badminton']);
            $table->enum('ball_type', ['tennis', 'tape', 'hard'])->nullable();
            $table->string('status');
            $table->string('league');
            $table->date('date');
            $table->string('start_time')->nullable();
            $table->string('venue');
            $table->string('security')->nullable();
            $table->string('bid');
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
