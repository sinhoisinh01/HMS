<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    protected $guarded = [];

	protected $hidden = ['document'];

    public $timestamps = false;

    public function categories()
    {
        return $this->belongsToMany('App\Models\Category');
    }

    public function resources()
    {
        return $this->belongsToMany('App\Models\Resource');
    }
}