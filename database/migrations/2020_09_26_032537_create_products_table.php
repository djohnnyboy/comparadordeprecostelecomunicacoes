<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     * 
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('channels')->nullable();
            $table->integer('internetGb')->nullable();
            $table->string('landLine')->nullable();
            $table->string('connection')->nullable();
            $table->boolean('zoneIn');
            $table->boolean('phones')->nullable();
            $table->decimal('phones0', 8, 2)->nullable();
            $table->decimal('phones1', 8, 2)->nullable();
            $table->decimal('phones2', 8, 2)->nullable();
            $table->decimal('phones3', 8, 2)->nullable();
            $table->decimal('phones4', 8, 2)->nullable();
            $table->decimal('discount', 8, 2)->nullable();
            $table->integer('discountTime')->nullable();
            $table->string('extra')->nullable();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
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
        Schema::dropIfExists('products');
    }
}
