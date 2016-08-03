<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstructionResource extends Model
{
    protected $table = 'construction_resource';

    protected $fillable = array('construction_id','resource_id','price');

	public $timestamps = false;
}