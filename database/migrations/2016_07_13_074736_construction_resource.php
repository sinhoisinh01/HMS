<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

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
             $table->integer('resource_id')->unsigned();
            $table->integer('price');
             $table->primary(['construction_id', 'resource_id']);
            $table->foreign('construction_id')->references('id')->on('constructions')->onDelete('cascade');
             $table->foreign('resource_id')->references('id')->on('resources')->onDelete('cascade');
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
