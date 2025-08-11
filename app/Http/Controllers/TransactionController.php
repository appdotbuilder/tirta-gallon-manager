<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GallonTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display transaction history.
     */
    public function index(Request $request)
    {
        $query = GallonTransaction::with('employee')
            ->orderBy('created_at', 'desc');

        // Filter by month if provided
        if ($request->month) {
            $query->where('month_year', $request->month);
        }

        // Filter by employee if provided
        if ($request->employee_id) {
            $query->whereHas('employee', function ($q) use ($request) {
                $q->where('employee_id', 'like', '%' . $request->employee_id . '%');
            });
        }

        $transactions = $query->paginate(20);

        // Get available months for filter
        $availableMonths = GallonTransaction::selectRaw('DISTINCT month_year')
            ->orderBy('month_year', 'desc')
            ->pluck('month_year')
            ->map(function ($monthYear) {
                return [
                    'value' => $monthYear,
                    'label' => \Carbon\Carbon::createFromFormat('Y-m', $monthYear)->format('F Y')
                ];
            });

        return Inertia::render('admin/transactions/index', [
            'transactions' => $transactions,
            'available_months' => $availableMonths,
            'filters' => [
                'month' => $request->month,
                'employee_id' => $request->employee_id,
            ]
        ]);
    }
}