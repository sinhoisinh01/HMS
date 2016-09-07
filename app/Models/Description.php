<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Description extends Model
{
    protected $guarded = [];

    public $timestamps = false;
	
	protected $hidden = ['id', 'sub-category_id'];

    public function category_work()
    {
        return $this->belongsTo('App\Models\CategoryWork');
    }
}
