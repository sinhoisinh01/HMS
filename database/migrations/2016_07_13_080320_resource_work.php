<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class ResourceWork extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resource_work', function (Blueprint $table) {
            $table->integer('resource_id')->unsigned();
            $table->integer('work_id')->unsigned();
            $table->double('value');
            $table->primary(['resource_id', 'work_id']);
            $table->foreign('resource_id')->references('id')->on('resources')->onDelete('cascade');
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
        Schema::drop('resource_work');
    }
}
