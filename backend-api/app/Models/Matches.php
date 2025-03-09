<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matches extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'category',
        'security',
        'security_amount',
        'match_bid',
        'match_datetime',
        'ball_type',
        'venue',
        'overs',
        'join_code',
        'city',
        'province'
    ];

     // Define relationships
     public function user()
     {
         return $this->belongsTo(User::class);
     }
 
     public function team()
     {
         return $this->belongsTo(Team::class);
     }
}
