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
        Schema::create('resource_supplier', function (Blueprint $table) {
            $table->string('resource_code', 100);
            $table->integer('supplier_id')->unsigned();
            $table->integer('price');
            $table->primary(['resource_code', 'supplier_id']);
            $table->foreign('resource_code')->references('code')->on('resources')->onDelete('cascade');
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
