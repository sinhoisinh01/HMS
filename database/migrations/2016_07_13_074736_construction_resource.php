<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConstructionResource extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('construction_resource', function(Blueprint $table) {
            $table->integer('construction_id')->unsigned();
            $table->string('resource_code');
            $table->integer('price');
            $table->primary(['construction_id','resource_code']);
            $table->foreign('construction_id')->references('id')->on('constructions')->onDelete('cascade');
            $table->foreign('resource_code')->references('code')->on('resources')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::drop('construction_resource');
    }
}
