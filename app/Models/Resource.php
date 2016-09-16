<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    //protected $visible = ['id', 'code', 'name', 'unit', 'price'];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}