<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title', 255);
            $table->string('event_types', 255)->nullable();
            $table->date('date');
            $table->time('time_start');
            $table->time('time_end');
            $table->bigInteger('location_id')->unsigned();
            $table->longText('description')->nullable();
            $table->boolean('is_cancelled')->default(FALSE);

            $table->foreign('location_id')->references('id')->on('locations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
