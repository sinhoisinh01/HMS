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
        Schema::create('resource_work', function (Blueprint $table) {
            $table->string('resource_code');
            $table->integer('work_id')->unsigned();
            $table->float('value');
            $table->primary(['resource_code', 'work_id']);
            $table->foreign('resource_code')->references('code')->on('resources')->onDelete('cascade');
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
