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
            $table->string('work_code');
            $table->float('amount');
            $table->primary(['resource_code', 'work_code']);
            $table->foreign('resource_code')->references('code')->on('resources')->onDelete('cascade');
            $table->foreign('work_code')->references('code')->on('works')->onDelete('cascade');
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
