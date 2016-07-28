<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResourceSupplier extends Model
{
    protected $fillable = array('resource_id','supplier_id','price');

	public $timestamps = false;
}