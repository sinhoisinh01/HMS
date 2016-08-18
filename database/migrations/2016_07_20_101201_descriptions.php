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
            $table->integer('category_id')->unsigned();
            $table->string('work_code');
            $table->string('content')->nullable();
            $table->float('amount')->unsigned()->nullable();
            $table->float('length')->unsigned()->nullable();
            $table->float('width')->unsigned()->nullable();
            $table->float('height')->unsigned()->nullable();
            $table->foreign(['category_id', 'work_code'])
                ->references(['category_id', 'work_code'])->on('category_work')
                ->onDelete('cascade');
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
