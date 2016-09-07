<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $timestamps = false;
	protected $table = 'categories';
    protected $guarded = [];

    public function construction()
    {
        return $this->belongsTo('App\Models\Construction');
    }

    public function subcategories()
    {
        return $this->belongsToMany('App\Models\Subcategory');
    }
}