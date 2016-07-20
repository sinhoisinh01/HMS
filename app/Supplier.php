<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 7/14/2016
 * Time: 9:54 AM
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = array('id','name','address');
    public $timestamps = false;

    public function constructions()
    {
        return $this->hasMany('App\Construction');
    }
}