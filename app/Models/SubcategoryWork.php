<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubcategoryWork extends Model
{
	public $timestamps = false;
    protected $table = 'subcategory_work';
    protected $guarded = [];
	protected $hidden = ['id','name', 'document', 'subcategory_id', 'category_id', 'construction_id'];
}
