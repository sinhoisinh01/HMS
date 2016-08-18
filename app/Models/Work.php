<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    protected $visible = ['code', 'name', 'unit', 'price'];

    public function categories()
    {
        return $this->belongsToMany('App\Models\Category');
    }

    public function resources()
    {
        return $this->belongsToMany('App\Models\Resource');
    }
}