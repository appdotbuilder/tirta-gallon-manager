import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, History, Droplets, TrendingUp, Building, Activity, Calendar } from 'lucide-react';
import Heading from '@/components/heading';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Heading 
                            title="Admin Dashboard"
                            description="💧 PT Tirta Investama - Water Gallon Distribution Management"
                        />
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {new Date().toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Badge>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">-</div>
                            <p className="text-xs text-muted-foreground">Active employees</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Today's Distributions</CardTitle>
                            <Activity className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">-</div>
                            <p className="text-xs text-muted-foreground">Gallons distributed</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">This Month</CardTitle>
                            <Droplets className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">-</div>
                            <p className="text-xs text-muted-foreground">Total gallons</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Departments</CardTitle>
                            <Building className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">-</div>
                            <p className="text-xs text-muted-foreground">Active departments</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Users className="h-5 w-5 mr-2 text-blue-600" />
                                Employee Management
                            </CardTitle>
                            <CardDescription>
                                Manage employee records, grades, and gallon allowances
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <Button asChild className="h-auto p-4 flex-col">
                                    <Link href={route('employees.index')}>
                                        <Users className="h-6 w-6 mb-2" />
                                        <span>View All Employees</span>
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="h-auto p-4 flex-col">
                                    <Link href={route('employees.create')}>
                                        <Users className="h-6 w-6 mb-2" />
                                        <span>Add New Employee</span>
                                    </Link>
                                </Button>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div>• Add, edit, and manage employee records</div>
                                <div>• Set job grades and monthly allowances</div>
                                <div>• Activate/deactivate employee access</div>
                                <div>• Generate QR codes for scanning</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <History className="h-5 w-5 mr-2 text-green-600" />
                                Transaction History
                            </CardTitle>
                            <CardDescription>
                                View and analyze gallon distribution records
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <Button asChild variant="outline" className="h-auto p-4 flex-col">
                                    <Link href={route('transactions.index')}>
                                        <History className="h-6 w-6 mb-2" />
                                        <span>View Transactions</span>
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="h-auto p-4 flex-col">
                                    <Link href={route('transactions.index')}>
                                        <TrendingUp className="h-6 w-6 mb-2" />
                                        <span>Export Reports</span>
                                    </Link>
                                </Button>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div>• Complete transaction history</div>
                                <div>• Filter by month and employee</div>
                                <div>• Export to Excel for analysis</div>
                                <div>• Monitor usage patterns</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* System Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Droplets className="h-5 w-5 mr-2 text-blue-600" />
                            System Overview
                        </CardTitle>
                        <CardDescription>
                            Current system status and quick access to main features
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-blue-50 rounded-lg border">
                                <div className="text-3xl mb-2">🔍</div>
                                <h3 className="font-semibold mb-2">Gallon Scanning</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Employees can scan their cards to check allowances and take gallons
                                </p>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={route('gallon.index')}>View Scan Interface</Link>
                                </Button>
                            </div>

                            <div className="text-center p-4 bg-green-50 rounded-lg border">
                                <div className="text-3xl mb-2">📊</div>
                                <h3 className="font-semibold mb-2">Grade-Based Allowances</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Automatic monthly allowances based on employee job grades
                                </p>
                                <div className="space-y-1 text-xs text-gray-500">
                                    <div>Staff: 5 gallons</div>
                                    <div>Manager: 15 gallons</div>
                                    <div>Director: 20 gallons</div>
                                </div>
                            </div>

                            <div className="text-center p-4 bg-purple-50 rounded-lg border">
                                <div className="text-3xl mb-2">🔄</div>
                                <h3 className="font-semibold mb-2">Monthly Reset</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    All allowances automatically reset on the 1st of each month
                                </p>
                                <div className="text-sm font-medium text-purple-600">
                                    Next Reset: {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString('id-ID')}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity Placeholder */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                            Recent Activity
                        </CardTitle>
                        <CardDescription>
                            Latest system activity and transactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-8">
                            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Activity</h3>
                            <p className="text-gray-500 mb-4">
                                Recent employee transactions and system activities will appear here.
                            </p>
                            <Button asChild variant="outline">
                                <Link href={route('transactions.index')}>View All Transactions</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}