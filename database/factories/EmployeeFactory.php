<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $grades = [
            'Staff' => 5,
            'Senior Staff' => 8,
            'Supervisor' => 10,
            'Assistant Manager' => 12,
            'Manager' => 15,
            'Senior Manager' => 18,
            'Director' => 20
        ];

        $departments = [
            'Production',
            'Quality Control',
            'Logistics',
            'Sales & Marketing',
            'Human Resources',
            'Finance',
            'Information Technology',
            'Procurement',
            'Maintenance',
            'Research & Development'
        ];

        $locations = [
            'Jakarta Head Office',
            'Bekasi Production Plant',
            'Surabaya Branch',
            'Bandung Branch',
            'Medan Branch',
            'Denpasar Branch',
            'Makassar Branch'
        ];

        $selectedGrade = fake()->randomElement(array_keys($grades));

        return [
            'employee_id' => 'TI' . fake()->unique()->numerify('####'),
            'name' => fake('id_ID')->name(),
            'department' => fake()->randomElement($departments),
            'grade' => $selectedGrade,
            'location' => fake()->randomElement($locations),
            'monthly_allowance' => $grades[$selectedGrade],
            'is_active' => fake()->boolean(90), // 90% chance of being active
        ];
    }

    /**
     * Indicate that the employee is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the employee is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }
}