<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryWork extends Model
{
    protected $fillable = array('category_id','work_id','no','amount');

	public $timestamps = false;
}
