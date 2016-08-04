<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Description extends Model
{
    protected $fillable = array('category_id', 'work_code',
        'content', 'amount', 'width', 'length', 'height');

    public $timestamps = false;

    public function category_work()
    {
        return $this->belongsTo('App\Models\CategoryWork');
    }
}
