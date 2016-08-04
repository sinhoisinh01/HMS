<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
	protected $table = 'categories';

    protected $guarded = [];

	public $timestamps = false;

    public function construction()
    {
        return $this->belongsTo('App\Models\Construction');
    }

    public function works()
    {
        return $this->belongsToMany('App\Models\Work');
    }
}