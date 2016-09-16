<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResourceSupplier extends Model
{
    public $timestamps = false;
    protected $table = 'resource_supplier';
    protected $guarded = [];
    //protected $visible = ['resource_id', 'price'];
}