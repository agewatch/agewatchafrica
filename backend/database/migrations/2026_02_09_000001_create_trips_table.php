<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('destination_city');
            $table->string('destination_country');
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('price', 10, 2)->default(0);
            $table->unsignedInteger('capacity')->default(1);
            $table->string('status')->default('draft');
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->json('itinerary')->nullable();
            $table->unsignedTinyInteger('accessibility_rating')->nullable();
            $table->text('health_safety_notes')->nullable();
            $table->decimal('senior_discount_percent', 5, 2)->default(0);
            $table->json('included_items')->nullable();
            $table->json('excluded_items')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
