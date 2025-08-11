<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\GallonTransaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample employees with realistic data
        $employees = [
            [
                'employee_id' => 'TI001',
                'name' => 'Budi Santoso',
                'department' => 'Production',
                'grade' => 'Manager',
                'location' => 'Bekasi Production Plant',
                'monthly_allowance' => 15,
                'is_active' => true,
            ],
            [
                'employee_id' => 'TI002',
                'name' => 'Sari Dewi',
                'department' => 'Quality Control',
                'grade' => 'Senior Staff',
                'location' => 'Bekasi Production Plant',
                'monthly_allowance' => 8,
                'is_active' => true,
            ],
            [
                'employee_id' => 'TI003',
                'name' => 'Ahmad Rahman',
                'department' => 'Logistics',
                'grade' => 'Supervisor',
                'location' => 'Jakarta Head Office',
                'monthly_allowance' => 10,
                'is_active' => true,
            ],
            [
                'employee_id' => 'TI004',
                'name' => 'Maya Putri',
                'department' => 'Human Resources',
                'grade' => 'Assistant Manager',
                'location' => 'Jakarta Head Office',
                'monthly_allowance' => 12,
                'is_active' => true,
            ],
            [
                'employee_id' => 'TI005',
                'name' => 'Rudi Hartono',
                'department' => 'Information Technology',
                'grade' => 'Senior Staff',
                'location' => 'Jakarta Head Office',
                'monthly_allowance' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($employees as $employeeData) {
            $employee = Employee::create($employeeData);

            // Create some random transactions for each employee
            $transactionCount = random_int(1, 5);
            
            for ($i = 0; $i < $transactionCount; $i++) {
                $quantity = random_int(1, 3);
                $remainingAllowance = $employee->monthly_allowance - $quantity * ($i + 1);
                
                if ($remainingAllowance >= 0) {
                    GallonTransaction::create([
                        'employee_id' => $employee->id,
                        'quantity' => $quantity,
                        'remaining_allowance' => max(0, $remainingAllowance),
                        'transaction_date' => now()->subDays(random_int(1, 30))->format('Y-m-d'),
                        'month_year' => now()->format('Y-m'),
                    ]);
                }
            }
        }

        // Create additional random employees
        Employee::factory(25)
            ->create()
            ->each(function ($employee) {
                // Create 1-3 transactions for each employee
                $transactionCount = random_int(1, 3);
                
                for ($i = 0; $i < $transactionCount; $i++) {
                    $quantity = random_int(1, 4);
                    $usedSoFar = GallonTransaction::where('employee_id', $employee->id)
                        ->where('month_year', now()->format('Y-m'))
                        ->sum('quantity');
                    
                    $remainingAllowance = $employee->monthly_allowance - $usedSoFar - $quantity;
                    
                    if ($remainingAllowance >= 0) {
                        GallonTransaction::create([
                            'employee_id' => $employee->id,
                            'quantity' => $quantity,
                            'remaining_allowance' => max(0, $remainingAllowance),
                            'transaction_date' => now()->subDays(random_int(1, 30))->format('Y-m-d'),
                            'month_year' => now()->format('Y-m'),
                        ]);
                    }
                }
            });
    }
}