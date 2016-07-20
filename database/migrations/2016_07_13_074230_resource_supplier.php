<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ResourceSupplier extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resource_supplier', function(Blueprint $table) {
            $table->string('resource_id');
            $table->string('supplier_id');
            $table->integer('price');
            $table->primary(['resource_id','supplier_id']);
            $table->foreign('resource_id')->references("id")->on("resources");
            $table->foreign('supplier_id')->references("id")->on("suppliers");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('resource_supplier');
    }
}
