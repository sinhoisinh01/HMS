<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Construction extends Model
{
    protected $fillable = array('id', 'user_id', 'name', 'supplier_id',
        'address', 'investor', 'contractor', 'type', 'design_type', 'level');

    public function supplier()
    {
        return $this->belongsTo('App\Supplier');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function categories()
    {
        return $this->hasMany('App\Category');
    }

    public function resources()
    {
        return $this->belongsToMany('App\Resource');
    }
}