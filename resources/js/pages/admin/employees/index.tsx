import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Plus, Eye, Edit, Trash2, Building, Award, MapPin } from 'lucide-react';
import Heading from '@/components/heading';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    location: string;
    monthly_allowance: number;
    is_active: boolean;
    transactions_count: number;
    created_at: string;
}

interface PaginatedEmployees {
    data: Employee[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    employees: PaginatedEmployees;
    [key: string]: unknown;
}

export default function EmployeesIndex({ employees }: Props) {
    const handleDelete = (employee: Employee) => {
        if (confirm(`Are you sure you want to delete ${employee.name}? This action cannot be undone.`)) {
            router.delete(route('employees.destroy', employee.id));
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Heading 
                            title="Employee Management" 
                            description="Manage employee records and gallon allowances"
                        />
                    </div>
                    <Button asChild>
                        <Link href={route('employees.create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Employee
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{employees.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                            <Users className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {employees.data.filter(emp => emp.is_active).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Departments</CardTitle>
                            <Building className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {new Set(employees.data.map(emp => emp.department)).size}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Allowances</CardTitle>
                            <Award className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">
                                {employees.data.reduce((sum, emp) => sum + emp.monthly_allowance, 0)}
                            </div>
                            <p className="text-xs text-muted-foreground">gallons/month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Employees Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Employees</CardTitle>
                        <CardDescription>
                            List of all employees with their details and allowances
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee Info</TableHead>
                                    <TableHead>Department & Location</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Monthly Allowance</TableHead>
                                    <TableHead>Transactions</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.data.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{employee.name}</div>
                                                <div className="text-sm text-gray-500">ID: {employee.employee_id}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm">
                                                    <Building className="h-3 w-3 mr-1 text-gray-400" />
                                                    {employee.department}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                                                    {employee.location}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{employee.grade}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{employee.monthly_allowance} gallons</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-center">
                                                <div className="font-medium">{employee.transactions_count}</div>
                                                <div className="text-xs text-gray-500">transactions</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge 
                                                variant={employee.is_active ? "default" : "secondary"}
                                                className={employee.is_active ? "bg-green-100 text-green-800" : ""}
                                            >
                                                {employee.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('employees.show', employee.id)}>
                                                        <Eye className="h-3 w-3" />
                                                    </Link>
                                                </Button>
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('employees.edit', employee.id)}>
                                                        <Edit className="h-3 w-3" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(employee)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {employees.data.length === 0 && (
                            <div className="text-center py-8">
                                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                                <p className="text-gray-500 mb-4">Get started by adding your first employee.</p>
                                <Button asChild>
                                    <Link href={route('employees.create')}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add First Employee
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {employees.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: employees.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === employees.current_page ? "default" : "outline"}
                                size="sm"
                                onClick={() => router.get(route('employees.index'), { page })}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}