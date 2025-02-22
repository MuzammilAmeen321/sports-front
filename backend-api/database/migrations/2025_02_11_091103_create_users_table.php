<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_users_table.php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('username');
        $table->string('email')->unique();
        $table->string('phone')->nullable();
        $table->string('password');
        $table->string('profile_picture')->nullable(); // New column for profile picture
        $table->string('club_name')->nullable(); // New column for club name
        $table->string('sponsor_name')->nullable(); // New column for sponsor name
        $table->integer('total_matches')->default(0); // Add this field
        $table->integer('matches_won')->default(0); // Add this field
        $table->integer('matches_loss')->default(0); // Add this field
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
