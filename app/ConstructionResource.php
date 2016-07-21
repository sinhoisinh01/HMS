<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConstructionResource extends Model
{
    protected $fillable = array('construction_id','resource_id','price');

	public $timestamps = false;
}