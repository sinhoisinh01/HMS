<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CategoryWork extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('category_work', function(Blueprint $table) {
            $table->integer('category_id')->unsigned();
            $table->string('work_id');
            $table->integer('no');
            $table->float('amount');
            $table->primary(['category_id','work_id']);
            $table->foreign('category_id')->references("id")->on("categories");
             $table->foreign('work_id')->references("id")->on("works");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('category_work');
    }
}
