import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, User } from 'lucide-react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    location: string;
    monthly_allowance: number;
    is_active: boolean;
}



interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function EditEmployee({ employee }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        employee_id: employee.employee_id,
        name: employee.name,
        department: employee.department,
        grade: employee.grade,
        location: employee.location,
        monthly_allowance: employee.monthly_allowance,
        is_active: employee.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('employees.update', employee.id));
    };

    const gradeAllowances = {
        'Staff': 5,
        'Senior Staff': 8,
        'Supervisor': 10,
        'Assistant Manager': 12,
        'Manager': 15,
        'Senior Manager': 18,
        'Director': 20
    };

    const handleGradeChange = (grade: string) => {
        setData({
            ...data,
            grade,
            monthly_allowance: gradeAllowances[grade as keyof typeof gradeAllowances] || 5
        });
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-4">
                            <Button asChild variant="outline" size="sm">
                                <Link href={route('employees.show', employee.id)}>
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Link>
                            </Button>
                            <div>
                                <Heading title="Edit Employee" />
                                <p className="text-gray-600 mt-1">
                                    Update {employee.name}'s information
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="h-5 w-5 mr-2 text-blue-600" />
                            Employee Information
                        </CardTitle>
                        <CardDescription>
                            Update the employee's details. The monthly allowance will be automatically adjusted based on their grade.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Employee ID */}
                                <div className="space-y-2">
                                    <Label htmlFor="employee_id">Employee ID *</Label>
                                    <Input
                                        id="employee_id"
                                        type="text"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        placeholder="Enter employee ID"
                                        className={errors.employee_id ? 'border-red-500' : ''}
                                        required
                                    />
                                    <InputError message={errors.employee_id} />
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter full name"
                                        className={errors.name ? 'border-red-500' : ''}
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Department */}
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department *</Label>
                                    <Select onValueChange={(value) => setData('department', value)} value={data.department}>
                                        <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Production">Production</SelectItem>
                                            <SelectItem value="Quality Control">Quality Control</SelectItem>
                                            <SelectItem value="Logistics">Logistics</SelectItem>
                                            <SelectItem value="Sales & Marketing">Sales & Marketing</SelectItem>
                                            <SelectItem value="Human Resources">Human Resources</SelectItem>
                                            <SelectItem value="Finance">Finance</SelectItem>
                                            <SelectItem value="Information Technology">Information Technology</SelectItem>
                                            <SelectItem value="Procurement">Procurement</SelectItem>
                                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                                            <SelectItem value="Research & Development">Research & Development</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.department} />
                                </div>

                                {/* Grade */}
                                <div className="space-y-2">
                                    <Label htmlFor="grade">Job Grade *</Label>
                                    <Select onValueChange={handleGradeChange} value={data.grade}>
                                        <SelectTrigger className={errors.grade ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select job grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(gradeAllowances).map(([grade, allowance]) => (
                                                <SelectItem key={grade} value={grade}>
                                                    {grade} ({allowance} gallons/month)
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.grade} />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label htmlFor="location">Work Location *</Label>
                                    <Select onValueChange={(value) => setData('location', value)} value={data.location}>
                                        <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select work location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Jakarta Head Office">Jakarta Head Office</SelectItem>
                                            <SelectItem value="Bekasi Production Plant">Bekasi Production Plant</SelectItem>
                                            <SelectItem value="Surabaya Branch">Surabaya Branch</SelectItem>
                                            <SelectItem value="Bandung Branch">Bandung Branch</SelectItem>
                                            <SelectItem value="Medan Branch">Medan Branch</SelectItem>
                                            <SelectItem value="Denpasar Branch">Denpasar Branch</SelectItem>
                                            <SelectItem value="Makassar Branch">Makassar Branch</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.location} />
                                </div>

                                {/* Monthly Allowance */}
                                <div className="space-y-2">
                                    <Label htmlFor="monthly_allowance">Monthly Allowance (Gallons)</Label>
                                    <Input
                                        id="monthly_allowance"
                                        type="number"
                                        value={data.monthly_allowance}
                                        onChange={(e) => setData('monthly_allowance', parseInt(e.target.value) || 0)}
                                        min="0"
                                        max="100"
                                        className={errors.monthly_allowance ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.monthly_allowance} />
                                    <p className="text-sm text-gray-500">Automatically set based on job grade</p>
                                </div>

                                {/* Active Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="is_active">Employee Status</Label>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked: boolean) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active" className="text-sm">
                                            {data.is_active ? 'Active' : 'Inactive'}
                                        </Label>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Only active employees can scan and take gallons
                                    </p>
                                </div>
                            </div>

                            {/* Status Preview */}
                            <Card className={`${data.is_active ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                                <CardHeader>
                                    <CardTitle className={`text-lg ${data.is_active ? 'text-green-800' : 'text-gray-700'}`}>
                                        Employee Status Preview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className={data.is_active ? 'text-green-700' : 'text-gray-600'}>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div><strong>Name:</strong> {data.name}</div>
                                        <div><strong>Employee ID:</strong> {data.employee_id}</div>
                                        <div><strong>Department:</strong> {data.department}</div>
                                        <div><strong>Grade:</strong> {data.grade}</div>
                                        <div><strong>Location:</strong> {data.location}</div>
                                        <div><strong>Monthly Allowance:</strong> {data.monthly_allowance} gallons</div>
                                    </div>
                                    <div className="mt-3 font-medium">
                                        Status: <span className={data.is_active ? 'text-green-600' : 'text-gray-500'}>
                                            {data.is_active ? '✅ Active - Can scan and take gallons' : '❌ Inactive - Cannot access system'}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-4 pt-6 border-t">
                                <Button asChild variant="outline">
                                    <Link href={route('employees.show', employee.id)}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {processing ? 'Updating...' : 'Update Employee'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}