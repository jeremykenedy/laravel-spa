<?php

namespace Module\Crypto\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';

    protected $guarded = ['id'];

    use HasFactory;
}
