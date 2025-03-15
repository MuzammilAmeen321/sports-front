<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matches extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'security',
        'security_amount',
        'match_bid',
        'match_datetime',
        'ball_type',
        'venue',
        'overs',
        'join_code',
    ];

    protected $casts = [
        'security' => 'boolean', // Ensure boolean conversion
        'match_datetime' => 'datetime',
    ];
}
