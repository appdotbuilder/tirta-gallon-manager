<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGallonTransactionRequest extends FormRequest
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
            'employee_id' => 'required|string|exists:employees,employee_id',
            'quantity' => 'required|integer|min:1|max:50',
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
            'employee_id.exists' => 'Employee not found in the system.',
            'quantity.required' => 'Quantity is required.',
            'quantity.min' => 'Quantity must be at least 1 gallon.',
            'quantity.max' => 'Quantity cannot exceed 50 gallons.',
        ];
    }
}