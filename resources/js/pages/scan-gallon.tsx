import React, { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Scan, User, Building, MapPin, Award, Droplets } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    location: string;
    monthly_allowance: number;
    remaining_allowance: number;
}

interface Transaction {
    id: number;
    quantity: number;
    remaining_allowance: number;
    created_at: string;
}

interface Props {
    employee?: Employee;
    transactions?: Transaction[];
    current_month?: string;
    error?: string;
    employee_id?: string;
    [key: string]: unknown;
}

export default function ScanGallon({ employee, transactions, current_month, error, employee_id }: Props) {
    const [inputEmployeeId, setInputEmployeeId] = useState(employee_id || '');
    const [quantity, setQuantity] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Focus on input for barcode scanning
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [employee]);

    const handleLookup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputEmployeeId.trim()) return;

        router.get(route('gallon.show'), {
            employee_id: inputEmployeeId.trim()
        });
    };

    const handleTakeGallons = () => {
        if (!employee || quantity < 1) return;

        setIsProcessing(true);
        router.post(route('gallon.store'), {
            employee_id: employee.employee_id,
            quantity: quantity
        }, {
            preserveState: false,
            onFinish: () => setIsProcessing(false)
        });
    };

    const handleReset = () => {
        setInputEmployeeId('');
        setQuantity(1);
        router.get(route('gallon.index'));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Droplets className="h-12 w-12 text-blue-600 mr-3" />
                        <h1 className="text-4xl font-bold text-gray-900">PT Tirta Investama</h1>
                    </div>
                    <p className="text-xl text-gray-600">💧 Water Gallon Distribution System</p>
                    <p className="text-sm text-gray-500 mt-2">Scan your employee card or enter your ID to get started</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                )}

                {/* Employee Lookup Card */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Scan className="h-5 w-5 mr-2 text-blue-600" />
                            Employee Lookup
                        </CardTitle>
                        <CardDescription>
                            Scan your employee barcode or manually enter your Employee ID
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLookup} className="flex gap-4">
                            <div className="flex-1">
                                <Label htmlFor="employee_id" className="sr-only">Employee ID</Label>
                                <Input
                                    ref={inputRef}
                                    id="employee_id"
                                    type="text"
                                    placeholder="Scan barcode or enter Employee ID..."
                                    value={inputEmployeeId}
                                    onChange={(e) => setInputEmployeeId(e.target.value)}
                                    className="text-lg py-3"
                                    autoComplete="off"
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="bg-blue-600 hover:bg-blue-700 px-8"
                                disabled={!inputEmployeeId.trim()}
                            >
                                Lookup
                            </Button>
                            {employee && (
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={handleReset}
                                >
                                    Reset
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Employee Information */}
                {employee && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Employee Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="h-5 w-5 mr-2 text-blue-600" />
                                    Employee Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Employee ID</Label>
                                        <p className="font-semibold text-lg">{employee.employee_id}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Name</Label>
                                        <p className="font-semibold text-lg">{employee.name}</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <Building className="h-4 w-4 mr-2 text-gray-400" />
                                        <div>
                                            <Label className="text-sm font-medium text-gray-500">Department</Label>
                                            <p className="font-medium">{employee.department}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Award className="h-4 w-4 mr-2 text-gray-400" />
                                        <div>
                                            <Label className="text-sm font-medium text-gray-500">Grade</Label>
                                            <Badge variant="secondary">{employee.grade}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Location</Label>
                                        <p className="font-medium">{employee.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Gallon Allowance */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Droplets className="h-5 w-5 mr-2 text-blue-600" />
                                    Monthly Allowance - {current_month}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center mb-6">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">
                                        {employee.remaining_allowance}
                                    </div>
                                    <p className="text-gray-600">Gallons Remaining</p>
                                    <p className="text-sm text-gray-500">
                                        of {employee.monthly_allowance} total monthly allowance
                                    </p>
                                </div>

                                {employee.remaining_allowance > 0 ? (
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="quantity" className="text-sm font-medium">
                                                How many gallons do you want to take?
                                            </Label>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    disabled={quantity <= 1}
                                                >
                                                    -
                                                </Button>
                                                <Input
                                                    id="quantity"
                                                    type="number"
                                                    min="1"
                                                    max={employee.remaining_allowance}
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(Math.max(1, Math.min(employee.remaining_allowance, parseInt(e.target.value) || 1)))}
                                                    className="w-20 text-center"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setQuantity(Math.min(employee.remaining_allowance, quantity + 1))}
                                                    disabled={quantity >= employee.remaining_allowance}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>

                                        <Button 
                                            onClick={handleTakeGallons}
                                            className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
                                            disabled={isProcessing || quantity > employee.remaining_allowance}
                                        >
                                            {isProcessing ? 'Processing...' : `Take ${quantity} Gallon${quantity > 1 ? 's' : ''}`}
                                        </Button>
                                    </div>
                                ) : (
                                    <Alert className="bg-yellow-50 border-yellow-200">
                                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                                        <AlertDescription className="text-yellow-800">
                                            You have reached your monthly gallon limit. Your allowance will reset next month.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>

                        {/* Recent Transactions */}
                        {transactions && transactions.length > 0 && (
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Recent Transactions - {current_month}</CardTitle>
                                    <CardDescription>
                                        Your gallon pickup history for this month
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {transactions.map((transaction) => (
                                            <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                                <div>
                                                    <span className="font-medium">{transaction.quantity} gallon{transaction.quantity > 1 ? 's' : ''} taken</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(transaction.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {transaction.remaining_allowance} remaining after
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Instructions */}
                {!employee && !error && (
                    <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-800">How to Use</CardTitle>
                        </CardHeader>
                        <CardContent className="text-blue-700">
                            <ol className="list-decimal list-inside space-y-2">
                                <li>📱 <strong>Scan your employee barcode</strong> - Just point your barcode at the scanner</li>
                                <li>✏️ <strong>Or manually enter your Employee ID</strong> - Type your ID and click "Lookup"</li>
                                <li>👤 <strong>Verify your information</strong> - Check that your details are correct</li>
                                <li>💧 <strong>Select quantity</strong> - Choose how many gallons you want to take</li>
                                <li>✅ <strong>Confirm and take</strong> - Click the button to complete your transaction</li>
                            </ol>
                            <Separator className="my-4 bg-blue-200" />
                            <p className="text-sm">
                                💡 <strong>Tip:</strong> Your gallon allowance is based on your job grade and resets every month. 
                                Make sure to use your allowance before the month ends!
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}