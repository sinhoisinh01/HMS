<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubcategoryWork extends Model
{
	public $timestamps = false;
    protected $table = 'subcategory_work';
    protected $guarded = [];
    //protected $visible = ['id', 'name', 'works', 'no', 'code', 'unit', 'value', 'price',
        //'descriptions', 'amount', 'length', 'width', 'height'];

    public function descriptions()
    {
        return $this->hasMany('App\Models\Description', 'subcategoryWork_id');
    }
}
