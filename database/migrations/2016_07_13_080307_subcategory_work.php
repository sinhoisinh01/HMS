<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class SubcategoryWork extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subcategory_work', function (Blueprint $table) {
            $table->integer('subcategory_id')->unsigned();
            $table->integer('work_id')->unsigned();
            $table->integer('no');
            $table->float('value');
            $table->primary(['subcategory_id', 'work_id']);
            $table->foreign('subcategory_id')->references('id')->on('subcategories')->onDelete('cascade');
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
        Schema::drop('subcategory_work');
    }
}
