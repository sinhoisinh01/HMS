<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
	protected $table = 'sub-categories';

    protected $guarded = [];

	public $timestamps = false;

    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }

    public function works()
    {
        return $this->belongsToMany('App\Models\Work');
    }
}