<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Construction extends Model
{
    protected $fillable = array('id','user_id','name','supplier_id','address','investor','contractor','type','design_type','level');
}