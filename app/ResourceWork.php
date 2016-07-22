<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ResourceWork extends Model
{
    protected $fillable = array('resource_id','work_id','amount');

	public $timestamps = false;

    public function descriptions()
    {
        return $this->hasMany('App\Description');
    }
}