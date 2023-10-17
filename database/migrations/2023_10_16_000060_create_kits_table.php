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
        Schema::create('kits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jumper_id')->constrained();
            $table->text('indentifer');
            $table->text('main')->nullable();
            $table->integer('main_size')->nullable();
            $table->text('reserve')->nullable();
            $table->integer('reserve_size')->nullable();
            $table->text('aad')->nullable();
            $table->date('aad_service_due')->nullable();
            $table->date('reserve_due')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kits');
    }
};
