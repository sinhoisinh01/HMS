<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $timestamps = false;
	protected $table = 'categories';
    protected $guarded = [];
    //protected $visible = ['id', 'name'];

    public function construction()
    {
        return $this->belongsTo('App\Models\Construction');
    }

    public function subcategories()
    {
        return $this->hasMany('App\Models\Subcategory');
    }

    public function subcategoryWorks()
    {
        return $this->hasManyThrough('App\Models\SubcategoryWork', 'App\Models\Subcategory');
    }
}