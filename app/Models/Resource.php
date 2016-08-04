<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    protected $fillable = array('code','name','unit');

    public $timestamps = false;

    public function constructions()
    {
        return $this->belongsToMany('App\Models\Construction');
    }

    public function suppliers()
    {
        return $this->belongsToMany('App\Models\Supplier');
    }

    public function works()
    {
        return $this->belongsToMany('App\Models\Work');
    }
}