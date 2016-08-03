<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryWork extends Model
{
    protected $table = 'category_work';

    protected $fillable = array('category_id','work_id','no','amount');

	public $timestamps = false;
}
