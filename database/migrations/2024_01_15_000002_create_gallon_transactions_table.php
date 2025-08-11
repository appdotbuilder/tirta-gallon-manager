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
        Schema::create('gallon_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->integer('remaining_allowance');
            $table->date('transaction_date');
            $table->string('month_year', 7);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('transaction_date');
            $table->index('month_year');
            $table->index(['employee_id', 'month_year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallon_transactions');
    }
};