<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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
            $table->string('work_id');
            $table->string('content');
            $table->float('amount')->unsigned();
            $table->float('length')->unsigned();
            $table->float('width')->unsigned();
            $table->float('height')->unsigned();
            $table->foreign(['category_id', 'work_id'])
                ->references(['category_id', 'work_id'])->on('category_work')
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
