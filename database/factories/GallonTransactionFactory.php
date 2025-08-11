<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GallonTransaction>
 */
class GallonTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $employee = Employee::factory()->create();
        $quantity = fake()->numberBetween(1, 5);
        $transactionDate = fake()->dateTimeBetween('-3 months', 'now');
        
        return [
            'employee_id' => $employee->id,
            'quantity' => $quantity,
            'remaining_allowance' => fake()->numberBetween(0, $employee->monthly_allowance - $quantity),
            'transaction_date' => $transactionDate->format('Y-m-d'),
            'month_year' => $transactionDate->format('Y-m'),
        ];
    }

    /**
     * Create a transaction for a specific employee.
     */
    public function forEmployee(Employee $employee): static
    {
        return $this->state(fn (array $attributes) => [
            'employee_id' => $employee->id,
        ]);
    }

    /**
     * Create a transaction for current month.
     */
    public function currentMonth(): static
    {
        $now = now();
        return $this->state(fn (array $attributes) => [
            'transaction_date' => $now->format('Y-m-d'),
            'month_year' => $now->format('Y-m'),
        ]);
    }

    /**
     * Create a transaction for a specific month.
     */
    public function forMonth(string $monthYear): static
    {
        $date = \Carbon\Carbon::createFromFormat('Y-m', $monthYear);
        return $this->state(fn (array $attributes) => [
            'transaction_date' => $date->format('Y-m-d'),
            'month_year' => $monthYear,
        ]);
    }
}