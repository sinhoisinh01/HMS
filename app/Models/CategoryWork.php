<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryWork extends Model
{
    protected $table = 'category_work';

    protected $guarded = [];

    protected $hidden = ['document', 'supplier_id', 'category_id'];

	public $timestamps = false;
}
