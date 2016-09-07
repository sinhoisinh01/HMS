<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Resources extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('resources', function(Blueprint $table) {
            $table->string('code');
            $table->string('name');
            $table->string('unit');
			$table->integer('user_id')->nullable();
            $table->primary('code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
         Schema::drop('resources');
    }
}
