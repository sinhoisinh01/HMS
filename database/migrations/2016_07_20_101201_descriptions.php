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
<<<<<<< HEAD
            $table->integer('sub-category_id')->unsigned();
            $table->integer('work_id');
            $table->string('content');
            $table->float('amount')->unsigned();
            $table->float('length')->unsigned();
            $table->float('width')->unsigned();
            $table->float('height')->unsigned();
			$table->float('value')->unsigned();
            $table->foreign(['sub-category_id', 'work_id'])
                ->references(['sub-category_id', 'work_id'])->on('category_work')
=======
            $table->integer('category_id')->unsigned();
            $table->string('work_code');
            $table->string('content')->nullable();
            $table->float('amount')->unsigned()->nullable();
            $table->float('length')->unsigned()->nullable();
            $table->float('width')->unsigned()->nullable();
            $table->float('height')->unsigned()->nullable();
            $table->foreign(['category_id', 'work_code'])
                ->references(['category_id', 'work_code'])->on('category_work')
>>>>>>> e9161cdc14b9fccb003cc8d2f2cf63aab4ee7c43
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
