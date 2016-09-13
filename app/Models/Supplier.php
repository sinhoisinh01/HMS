<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    protected $hidden = ['user_id'];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function resources()
    {
        return $this->belongsToMany('App\Models\Resource');
    }
}