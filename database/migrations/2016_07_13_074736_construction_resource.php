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
            $table->string('resource_id');
            $table->integer('price');
            $table->primary(['construction_id','resource_id']);
            $table->foreign('construction_id')->references('id')->on('constructions');
            $table->foreign('resource_id')
            ->references('id')->on('resources')
            ->onDelete('cascade')
            ->onUpdate('cascade');
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
