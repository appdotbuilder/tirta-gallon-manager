import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, Download, Filter, Calendar, User, Droplets } from 'lucide-react';
import Heading from '@/components/heading';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    location: string;
}

interface Transaction {
    id: number;
    quantity: number;
    remaining_allowance: number;
    transaction_date: string;
    created_at: string;
    employee: Employee;
}

interface PaginatedTransactions {
    data: Transaction[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface AvailableMonth {
    value: string;
    label: string;
}

interface Filters {
    month?: string;
    employee_id?: string;
}

interface Props {
    transactions: PaginatedTransactions;
    available_months: AvailableMonth[];
    filters: Filters;
    [key: string]: unknown;
}

export default function TransactionsIndex({ transactions, available_months, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value || undefined };
        // Remove empty filters
        Object.keys(newFilters).forEach(k => {
            if (!newFilters[k as keyof Filters]) {
                delete newFilters[k as keyof Filters];
            }
        });
        
        router.get(route('transactions.index'), newFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        router.get(route('transactions.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    const exportToExcel = () => {
        // This would trigger an Excel download in a real implementation
        alert('Excel export functionality would be implemented here.\n\nThis would download a detailed report of all transaction data with filters applied.');
    };

    const totalGallonsDistributed = transactions.data.reduce((sum, transaction) => sum + transaction.quantity, 0);

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Heading 
                            title="Transaction History"
                            description="Complete record of all gallon distributions"
                        />
                    </div>
                    <Button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700">
                        <Download className="h-4 w-4 mr-2" />
                        Export to Excel
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                            <History className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{transactions.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Gallons Distributed</CardTitle>
                            <Droplets className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{totalGallonsDistributed}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unique Employees</CardTitle>
                            <User className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {new Set(transactions.data.map(t => t.employee.id)).size}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">This Page</CardTitle>
                            <Calendar className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">
                                {transactions.data.length}
                            </div>
                            <p className="text-xs text-muted-foreground">of {transactions.per_page} per page</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Filter className="h-5 w-5 mr-2" />
                            Filter Transactions
                        </CardTitle>
                        <CardDescription>
                            Filter the transaction history by month and employee
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="month-filter">Month</Label>
                                <Select 
                                    onValueChange={(value) => handleFilter('month', value)}
                                    value={filters.month || ''}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All months" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All months</SelectItem>
                                        {available_months.map((month) => (
                                            <SelectItem key={month.value} value={month.value}>
                                                {month.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="employee-filter">Employee ID</Label>
                                <Input
                                    id="employee-filter"
                                    type="text"
                                    placeholder="Search by Employee ID..."
                                    value={filters.employee_id || ''}
                                    onChange={(e) => handleFilter('employee_id', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>&nbsp;</Label>
                                <Button 
                                    variant="outline" 
                                    onClick={clearFilters}
                                    className="w-full"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transactions Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction Records</CardTitle>
                        <CardDescription>
                            {filters.month || filters.employee_id ? 
                                'Filtered transaction history' : 
                                'Complete transaction history'
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Department & Location</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Remaining After</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.data.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">
                                                    {new Date(transaction.transaction_date).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(transaction.created_at).toLocaleTimeString('id-ID', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{transaction.employee.name}</div>
                                                <div className="text-sm text-gray-500">ID: {transaction.employee.employee_id}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="text-sm font-medium">{transaction.employee.department}</div>
                                                <div className="text-xs text-gray-500">{transaction.employee.location}</div>
                                                <Badge variant="outline" className="text-xs">
                                                    {transaction.employee.grade}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-blue-100 text-blue-800">
                                                {transaction.quantity} gallon{transaction.quantity > 1 ? 's' : ''}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium">{transaction.remaining_allowance} gallons</span>
                                        </TableCell>
                                        <TableCell>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={route('employees.show', transaction.employee.id)}>
                                                    View Employee
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {transactions.data.length === 0 && (
                            <div className="text-center py-8">
                                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                                <p className="text-gray-500 mb-4">
                                    {filters.month || filters.employee_id ? 
                                        'Try adjusting your filters to see more results.' :
                                        'No gallon distributions have been recorded yet.'
                                    }
                                </p>
                                {(filters.month || filters.employee_id) && (
                                    <Button onClick={clearFilters} variant="outline">
                                        Clear Filters
                                    </Button>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {transactions.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: transactions.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === transactions.current_page ? "default" : "outline"}
                                size="sm"
                                onClick={() => router.get(route('transactions.index'), { ...filters, page })}
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