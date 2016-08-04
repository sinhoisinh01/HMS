<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $guarded = [];

    public $timestamps = false;

    public function constructions()
    {
        return $this->hasMany('App\Models\Construction');
    }

    public function resources()
    {
        return $this->belongsToMany('App\Models\Resource');
    }
}