<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\PersonalAccessToken;

class Impersonation extends Model
{
    use HasFactory;

    protected $table = 'impersonations';

    public $timestamps = true;

    protected $guarded = [
        'id',
    ];

    protected $hidden = [];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'personal_access_token_id',
        'user_id',
    ];

    protected $casts = [
        'id'                        => 'integer',
        'user_id'                   => 'integer',
        'personal_access_token_id'  => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function token()
    {
        return $this->belongsTo(PersonalAccessToken::class);
    }
}
