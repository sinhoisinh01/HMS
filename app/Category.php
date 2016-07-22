<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
	protected $table = 'categories';

    protected $fillable = array('id','construction_id','name');

	public $timestamps = false;

    public function construction()
    {
        return $this->belongsTo('App\Construction');
    }

    public function works()
    {
        return $this->belongsToMany('App\Work');
    }
}