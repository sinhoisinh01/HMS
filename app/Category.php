<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
	public $timestamps = false;
	protected $table = 'categories';// to map to table categories
    protected $fillable = array('id','construction_id','name');
}