<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RedmineSetting extends Model {

	protected $table = 'redmine_settings';

	protected $guarded = [];
	
    protected $hidden = ['id'];

    public $timestamps = false;
}