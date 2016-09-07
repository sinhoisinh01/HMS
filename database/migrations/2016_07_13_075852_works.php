<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Works extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('works', function(Blueprint $table) {
            $table->increments('id');
			$table->string('code');
            $table->string('document')->nullable();
            $table->string('name');
            $table->string('unit');
			$table->integer('construction_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('works');
    }
}
