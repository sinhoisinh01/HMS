<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
class ConstructionResourceWork extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('construction_resource_work', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('construction_id')->unsigned();
            $table->integer('resource_id')->unsigned();
            $table->integer('work_id')->unsigned();
            $table->double('value');
            $table->foreign('construction_id')->references('id')->on('constructions')->onDelete('cascade');
            $table->foreign('resource_id')->references('id')->on('resources')->onDelete('cascade');
            $table->foreign('work_id')->references('id')->on('works')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('construction_resource_work');
    }
}