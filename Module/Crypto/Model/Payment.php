<?php

namespace Module\Crypto\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';

    protected $guarded = ['id'];

    use HasFactory;
}
