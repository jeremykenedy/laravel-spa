<?php

namespace Module\Crypto\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    protected $table = 'wallets';

    protected $guarded = ['id'];

    use HasFactory;
}
