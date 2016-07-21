<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ResourceWork extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
    {
         Schema::create('resource_work', function(Blueprint $table) {
            $table->string('resource_id');
            $table->string('work_id');
            $table->integer('amount');
            $table->primary(['resource_id','work_id']);
            $table->foreign('resource_id')->references('id')->on('resources');
            $table->foreign('work_id')->references('id')->on('works');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('resource_work');
    }
}
