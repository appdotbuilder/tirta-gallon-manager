import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Droplets, Scan, Users, BarChart3, Shield, Clock, Award, Building } from 'lucide-react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Droplets className="h-8 w-8 text-blue-600 mr-3" />
                            <span className="text-2xl font-bold text-gray-900">PT Tirta Investama</span>
                        </div>
                        <div className="flex space-x-4">
                            <Button asChild variant="outline">
                                <Link href={route('login')}>Admin Login</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-blue-100 p-4 rounded-full">
                            <Droplets className="h-16 w-16 text-blue-600" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        💧 Water Gallon Distribution System
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Streamlined water gallon distribution management for PT Tirta Investama employees. 
                        Scan your employee card, check your monthly allowance, and track your consumption - all in one place.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                            <Link href={route('gallon.index')}>
                                <Scan className="h-5 w-5 mr-2" />
                                Scan Employee Card
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                                <Scan className="h-8 w-8 text-blue-600" />
                            </div>
                            <CardTitle className="text-lg">Easy Scanning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Simply scan your employee barcode or manually enter your ID to get started instantly.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                                <Award className="h-8 w-8 text-green-600" />
                            </div>
                            <CardTitle className="text-lg">Grade-Based Allowance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Your monthly gallon allowance is automatically calculated based on your job grade and position.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                                <Clock className="h-8 w-8 text-purple-600" />
                            </div>
                            <CardTitle className="text-lg">Monthly Reset</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Allowances automatically reset every month, ensuring fair distribution for all employees.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
                                <BarChart3 className="h-8 w-8 text-orange-600" />
                            </div>
                            <CardTitle className="text-lg">Real-time Tracking</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Track your consumption in real-time and see your remaining allowance instantly.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* How It Works */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Scan or Enter ID</h3>
                            <p className="text-gray-600">Use your employee barcode scanner or manually type your Employee ID</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">View Allowance</h3>
                            <p className="text-gray-600">Check your remaining monthly allowance and employee details</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-purple-600">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Take Gallons</h3>
                            <p className="text-gray-600">Select quantity and confirm your gallon pickup transaction</p>
                        </div>
                    </div>
                </div>

                {/* Stats Preview */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">System Overview</h2>
                        <p className="text-blue-100">Efficient water distribution management</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">🏢</div>
                            <div className="text-2xl font-bold">PT Tirta Investama</div>
                            <div className="text-blue-100">Leading Water Company</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">💧</div>
                            <div className="text-2xl font-bold">Smart Distribution</div>
                            <div className="text-blue-100">Automated & Fair</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">📊</div>
                            <div className="text-2xl font-bold">Real-time Tracking</div>
                            <div className="text-blue-100">Instant Updates</div>
                        </div>
                    </div>
                </div>

                {/* Admin Section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Administrative Features</h2>
                            <p className="text-gray-600">Comprehensive management tools for system administrators</p>
                        </div>
                        <Shield className="h-12 w-12 text-blue-600" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Employee Management</h3>
                                <p className="text-sm text-gray-600">Add, edit, and manage employee records with grade-based allowances</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <BarChart3 className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Transaction History</h3>
                                <p className="text-sm text-gray-600">View detailed reports and download Excel exports of all transactions</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <Building className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Department Tracking</h3>
                                <p className="text-sm text-gray-600">Monitor usage by department, location, and employee grade</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-orange-100 p-2 rounded-lg">
                                <Scan className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">QR Code Generation</h3>
                                <p className="text-sm text-gray-600">Generate and manage employee QR codes for easy scanning</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <Button asChild variant="outline" size="lg">
                            <Link href={route('login')}>
                                <Shield className="h-5 w-5 mr-2" />
                                Access Admin Panel
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <Droplets className="h-8 w-8 text-blue-400 mr-3" />
                            <span className="text-2xl font-bold">PT Tirta Investama</span>
                        </div>
                        <p className="text-gray-400">Water Gallon Distribution Management System</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Streamlining employee water distribution with smart automation
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}