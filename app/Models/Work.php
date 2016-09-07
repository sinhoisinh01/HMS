<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    protected $visible = ['id', 'code', 'name', 'unit', 'price'];

    public function sub-categories()
    {
        return $this->belongsToMany('App\Models\SubCategory');
    }

    public function resources()
    {
        return $this->belongsToMany('App\Models\Resource');
    }
}