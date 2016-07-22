<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    protected $fillable = array('id','name','unit');

    public $timestamps = false;

    public function constructions()
    {
        return $this->belongsToMany('App\Construction');
    }

    public function suppliers()
    {
        return $this->belongsToMany('App\Supplier');
    }

    public function works()
    {
        return $this->belongsToMany('App\Work');
    }
}