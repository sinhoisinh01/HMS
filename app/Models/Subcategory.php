<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
	public $timestamps = false;
    protected $table = 'subcategories';
    protected $guarded = [];
    //protected $visible = ['id', 'name'];

    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }

    public function works()
    {
        return $this->hasMany('App\Models\Work');
    }

    public function subcategoryWorks()
    {
        return $this->hasMany('App\Models\SubcategoryWork');
    }
}