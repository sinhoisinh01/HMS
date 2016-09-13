<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Construction extends Model
{
    protected $guarded = [];
    protected $hidden = ['user_id'];

    public function supplier()
    {
        return $this->belongsTo('App\Models\Supplier');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function categories()
    {
        return $this->hasMany('App\Models\Category');
    }

    public function works()
    {
        return $this->hasMany('App\Models\Work');
    }

    public function resources()
    {
        return $this->belongsToMany('App\Models\Resource');
    }
}