<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->enum('kategori', ['seminar', 'workshop', 'kompetisi', 'webinar']);
            $table->string('organization_maker');
            $table->enum('tipe', ['online', 'offline']);
            $table->dateTime('open_event');
            $table->dateTime('close_event');
            $table->decimal('price_ticket', 12,2);
            $table->enum('status', ['pending', 'approve', 'decline'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_submissions');
    }
};
