<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Constructions extends Migration
{
    public function up()
    {
        Schema::create('constructions', function(Blueprint $table) {
            $table->increments('id');
            $table->string('user_id');
            $table->string('name');
            $table->string('supplier_id');
            $table->string('address');
            $table->string('investor');
            $table->string('contractor');
            $table->string('type');
            $table->string('design_type');
            $table->string('level');
            $table->timestamps();
            $table->foreign('user_id')->references("id")->on("users");
        });
    }
    public function down()
    {
        Schema::drop('constructions');
    }
}
