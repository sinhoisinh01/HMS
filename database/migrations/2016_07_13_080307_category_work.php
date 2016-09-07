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
        Schema::create('category_work', function (Blueprint $table) {
            $table->integer('sub-category_id')->unsigned();
            $table->integer('work_id');
            $table->integer('no');
            $table->float('value');
            $table->primary(['sub-category_id', 'work_id']);
            $table->foreign('sub-category_id')->references('id')->on('sub-categories')->onDelete('cascade');
            $table->foreign('work_id')->references('id')->on('works')->onDelete('cascade');
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
