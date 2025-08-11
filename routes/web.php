<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GallonController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - Main gallon scanning interface
Route::get('/', [GallonController::class, 'index'])->name('gallon.index');

// Welcome page for marketing/info
Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

// Public gallon distribution routes
Route::controller(GallonController::class)->group(function () {
    Route::get('/scan', 'index')->name('gallon.scan');
    Route::get('/lookup', 'show')->name('gallon.show');
    Route::post('/take-gallons', 'store')->name('gallon.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Employee management
    Route::resource('employees', EmployeeController::class);
    
    // Transaction history
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
