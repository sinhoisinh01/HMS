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
            $table->string('work_id');
            $table->string('resource_id');
            $table->integer('amount');
            $table->primary(['work_id','resource_id']);
            $table->foreign('work_id')->references("id")->on("works");
            $table->foreign('resource_id')->references("id")->on("resources");
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
