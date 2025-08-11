<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGallonTransactionRequest;
use App\Models\Employee;
use App\Models\GallonTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GallonController extends Controller
{
    /**
     * Display the main gallon scanning interface.
     */
    public function index()
    {
        return Inertia::render('scan-gallon');
    }

    /**
     * Look up employee by ID for gallon distribution.
     */
    public function show(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string'
        ]);

        $employee = Employee::active()
            ->where('employee_id', $request->employee_id)
            ->first();

        if (!$employee) {
            return Inertia::render('scan-gallon', [
                'error' => 'Employee not found or inactive.',
                'employee_id' => $request->employee_id
            ]);
        }

        $remainingAllowance = $employee->getCurrentMonthRemainingAllowance();
        $currentMonthTransactions = $employee->getCurrentMonthTransactions();

        return Inertia::render('scan-gallon', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'grade' => $employee->grade,
                'location' => $employee->location,
                'monthly_allowance' => $employee->monthly_allowance,
                'remaining_allowance' => $remainingAllowance,
            ],
            'transactions' => $currentMonthTransactions,
            'current_month' => now()->format('F Y')
        ]);
    }

    /**
     * Process gallon transaction.
     */
    public function store(StoreGallonTransactionRequest $request)
    {
        $employee = Employee::active()
            ->where('employee_id', $request->employee_id)
            ->first();

        if (!$employee) {
            return back()->withErrors(['employee_id' => 'Employee not found or inactive.']);
        }

        $remainingAllowance = $employee->getCurrentMonthRemainingAllowance();
        $requestedQuantity = $request->quantity;

        if ($requestedQuantity > $remainingAllowance) {
            return back()->withErrors(['quantity' => "Insufficient allowance. Only {$remainingAllowance} gallons remaining this month."]);
        }

        // Create transaction
        $transaction = GallonTransaction::create([
            'employee_id' => $employee->id,
            'quantity' => $requestedQuantity,
            'remaining_allowance' => $remainingAllowance - $requestedQuantity,
            'transaction_date' => now()->toDateString(),
            'month_year' => now()->format('Y-m'),
        ]);

        // Redirect back with updated employee info
        return redirect()->route('gallon.show', ['employee_id' => $employee->employee_id])
            ->with('success', "Successfully dispensed {$requestedQuantity} gallon(s) to {$employee->name}.");
    }
}