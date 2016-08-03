<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResourceWork extends Model
{
    protected $table = 'resource_work';

    protected $fillable = array('resource_id','work_id','amount');

	public $timestamps = false;

    public function descriptions()
    {
        return $this->hasMany('App\Models\Description');
    }
}