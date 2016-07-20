<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Categories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('categories', function(Blueprint $table) {
            $table->integer('id')->unsigned();
            $table->integer('construction_id')->unsigned();
            $table->string('name');
            $table->primary('id');
            $table->foreign('construction_id')->references("id")->on("constructions");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('categories');
    }
}
