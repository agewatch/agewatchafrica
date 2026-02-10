<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->decimal('base_price', 10, 2)->default(0)->after('payment_method');
            $table->decimal('discount_percent', 5, 2)->default(0)->after('base_price');
            $table->decimal('discount_amount', 10, 2)->default(0)->after('discount_percent');
            $table->decimal('total_amount', 10, 2)->default(0)->after('discount_amount');
            $table->string('payment_provider', 50)->nullable()->after('total_amount');
            $table->string('payment_reference', 100)->nullable()->after('payment_provider');
            $table->timestamp('paid_at')->nullable()->after('payment_reference');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'base_price',
                'discount_percent',
                'discount_amount',
                'total_amount',
                'payment_provider',
                'payment_reference',
                'paid_at',
            ]);
        });
    }
};
