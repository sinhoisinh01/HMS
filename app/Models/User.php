<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    public $timestamps = false;
    protected $guarded = [];
    protected $hidden = ['id', 'google_id', 'token', 'refresh_token'];

    public function constructions()
    {
        return $this->hasMany('App\Models\Construction');
    }

    public function resources()
    {
        return $this->hasMany('App\Models\Resource');
    }

    public function suppliers()
    {
        return $this->hasMany('App\Models\Supplier');
    }
}
