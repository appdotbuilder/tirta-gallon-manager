import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Edit, Trash2, User, Building, Award, MapPin, Droplets, Calendar, QrCode } from 'lucide-react';
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
    created_at: string;
    transactions: Transaction[];
}

interface Transaction {
    id: number;
    quantity: number;
    remaining_allowance: number;
    transaction_date: string;
    created_at: string;
}

interface CurrentMonthStats {
    used: number;
    remaining: number;
    total: number;
}

interface Props {
    employee: Employee;
    current_month_stats: CurrentMonthStats;
    current_month: string;
    [key: string]: unknown;
}

export default function ShowEmployee({ employee, current_month_stats, current_month }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${employee.name}? This action cannot be undone.`)) {
            router.delete(route('employees.destroy', employee.id));
        }
    };

    const generateQRCode = () => {
        // This would generate a QR code for the employee ID
        alert(`QR Code for Employee ID: ${employee.employee_id}\n\nIn a real implementation, this would generate and download a QR code.`);
    };

    const usagePercentage = (current_month_stats.used / current_month_stats.total) * 100;

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button asChild variant="outline" size="sm">
                            <Link href={route('employees.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Employees
                            </Link>
                        </Button>
                        <div>
                            <Heading 
                                title={employee.name}
                                description={`Employee ID: ${employee.employee_id}`}
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button onClick={generateQRCode} variant="outline">
                            <QrCode className="h-4 w-4 mr-2" />
                            Generate QR Code
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('employees.edit', employee.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Link>
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Employee Details */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="h-5 w-5 mr-2 text-blue-600" />
                                Employee Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Personal Details</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Employee ID</p>
                                            <p className="font-medium text-lg">{employee.employee_id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            <p className="font-medium">{employee.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <Badge 
                                                variant={employee.is_active ? "default" : "secondary"}
                                                className={employee.is_active ? "bg-green-100 text-green-800" : ""}
                                            >
                                                {employee.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Work Details</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <Building className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Department</p>
                                                <p className="font-medium">{employee.department}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Award className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Job Grade</p>
                                                <Badge variant="secondary">{employee.grade}</Badge>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Location</p>
                                                <p className="font-medium">{employee.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <div className="flex items-start">
                                    <Calendar className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Joined</p>
                                        <p className="font-medium">
                                            {new Date(employee.created_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Current Month Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Droplets className="h-5 w-5 mr-2 text-blue-600" />
                                {current_month} Usage
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-1">
                                        {current_month_stats.remaining}
                                    </div>
                                    <p className="text-gray-600">Gallons Remaining</p>
                                </div>

                                {/* Usage Progress */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Usage</span>
                                        <span>{Math.round(usagePercentage)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${
                                                usagePercentage > 80 ? 'bg-red-500' : 
                                                usagePercentage > 60 ? 'bg-yellow-500' : 'bg-blue-500'
                                            }`}
                                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="font-bold text-lg text-gray-900">{current_month_stats.used}</div>
                                        <div className="text-gray-500">Used</div>
                                    </div>
                                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                                        <div className="font-bold text-lg text-blue-600">{current_month_stats.total}</div>
                                        <div className="text-blue-600">Total Allowance</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Transaction History */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>
                                Latest gallon transactions for this employee
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {employee.transactions && employee.transactions.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Remaining After</TableHead>
                                            <TableHead>Time</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {employee.transactions.map((transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell>
                                                    {new Date(transaction.transaction_date).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {transaction.quantity} gallon{transaction.quantity > 1 ? 's' : ''}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-medium">{transaction.remaining_allowance} gallons</span>
                                                </TableCell>
                                                <TableCell className="text-gray-500">
                                                    {new Date(transaction.created_at).toLocaleTimeString('id-ID', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-8">
                                    <Droplets className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
                                    <p className="text-gray-500">This employee hasn't taken any gallons this month.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}