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
            $table->string('category');
            $table->boolean('security')->default(false);

            $table->integer('security_amount')->nullable();
            $table->string('match_bid')->nullable();
            $table->dateTime('match_datetime');
            $table->string('ball_type');
            $table->string('venue');
            $table->integer('overs');
            $table->string('join_code')->unique();
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
