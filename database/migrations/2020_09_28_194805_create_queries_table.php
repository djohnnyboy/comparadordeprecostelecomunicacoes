<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQueriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('queries', function (Blueprint $table) {
            $table->id();
            $table->integer('contractTime');
            $table->string('email');
            $table->integer('number');
            $table->integer('channels');
            $table->integer('internetGb');
            $table->string('landline')->nullable();
            $table->integer('phones');
            $table->integer('postCode')->nullable();
            $table->integer('postCodeAux')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('queries');
    }
}
