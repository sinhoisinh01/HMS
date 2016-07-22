<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    protected $fillable = array('id','document','name','unit');

    public $timestamps = false;

    public function categories()
    {
        return $this->belongsToMany('App\Category');
    }

    public function resources()
    {
        return $this->belongsToMany('App\Resource');
    }
}