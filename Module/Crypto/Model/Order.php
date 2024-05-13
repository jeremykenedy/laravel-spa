<?php

namespace Module\Crypto\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    protected $guarded = ['id'];

    use HasFactory;
}
