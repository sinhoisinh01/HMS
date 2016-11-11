<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstructionResourceWork extends Model
{
    public $timestamps = false;
    protected $table = 'construction_resource_work';
    protected $guarded = [];
    
    public function construction()
    {
        return $this->belongsTo('App\Models\Construction');
    }

    public function work()
    {
        return $this->belongsTo('App\Models\Work');
    }
    
    public function resource()
    {
        return $this->belongsTo('App\Models\Resource');
    }
}