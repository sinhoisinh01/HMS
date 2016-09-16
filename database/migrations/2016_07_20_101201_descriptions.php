<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class Descriptions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('descriptions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('subcategoryWork_id')->unsigned();
            $table->string('name');
            $table->integer('no');
            $table->double('amount')->unsigned();
            $table->double('length')->unsigned();
            $table->double('width')->unsigned();
            $table->double('height')->unsigned();
            $table->double('value')->unsigned();
            $table->foreign('subcategoryWork_id')->references('id')
                ->on('subcategory_work')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('descriptions');
    }
}
