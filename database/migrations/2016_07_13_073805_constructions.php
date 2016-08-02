<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Constructions extends Migration
{
    public function up()
    {
        Schema::create('constructions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->integer('supplier_id')->unsigned();
            $table->string('address')->nullable();
            $table->string('investor')->nullable();
            $table->string('contractor')->nullable();
            $table->string('type')->nullable();
            $table->string('design_type')->nullable();
            $table->string('level')->nullable();
            $table->timestamps();
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
            $table->foreign('supplier_id')
                ->references('id')->on('suppliers');
        });
    }

    public function down()
    {
        Schema::drop('constructions');
    }
}
