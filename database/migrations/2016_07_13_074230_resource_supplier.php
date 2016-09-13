<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class ResourceSupplier extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resource_supplier', function (Blueprint $table) {
            $table->integer('resource_id')->unsigned();
            $table->integer('supplier_id')->unsigned();
            $table->integer('price');
            $table->primary(['resource_id', 'supplier_id']);
            $table->foreign('resource_id')->references('id')->on('resources')->onDelete('cascade');
            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('cascade');
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
