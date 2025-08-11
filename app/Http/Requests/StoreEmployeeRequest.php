<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'required|string|unique:employees,employee_id|max:50',
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'grade' => 'required|string|max:50',
            'location' => 'required|string|max:255',
            'monthly_allowance' => 'required|integer|min:0|max:100',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'employee_id.required' => 'Employee ID is required.',
            'employee_id.unique' => 'This Employee ID already exists.',
            'name.required' => 'Employee name is required.',
            'department.required' => 'Department is required.',
            'grade.required' => 'Job grade is required.',
            'location.required' => 'Location is required.',
            'monthly_allowance.required' => 'Monthly allowance is required.',
            'monthly_allowance.min' => 'Monthly allowance cannot be negative.',
            'monthly_allowance.max' => 'Monthly allowance cannot exceed 100 gallons.',
        ];
    }
}