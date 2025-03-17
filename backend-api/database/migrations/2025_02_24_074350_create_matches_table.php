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
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Add user_id as foreign key
            $table->string('category');
            $table->boolean('security')->default(false);
            $table->integer('security_amount')->nullable();
            $table->string('match_bid')->nullable();
            $table->dateTime('match_datetime');
            $table->string('ball_type');
            $table->string('venue');
            $table->integer('overs');
            $table->string('join_code')->unique();
            $table->string('city')->nullable(); // Add city
            $table->string('province')->nullable(); // Add province
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
