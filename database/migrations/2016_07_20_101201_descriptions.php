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
            $table->integer('subcategory_id')->unsigned();
            $table->integer('work_id')->unsigned();
            $table->string('name');
            $table->double('amount')->unsigned();
            $table->double('length')->unsigned();
            $table->double('width')->unsigned();
            $table->double('height')->unsigned();
            $table->double('value')->unsigned();
            $table->foreign(['subcategory_id', 'work_id'])->references(['subcategory_id', 'work_id'])
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
