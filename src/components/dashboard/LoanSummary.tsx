import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Loan } from '../../types';
import { formatCurrency, calculateLoanStatus } from '../../lib/utils';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';

interface LoanSummaryProps {
  loan: Loan;
}

export const LoanSummary: React.FC<LoanSummaryProps> = ({ loan }) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'overdue':
        return 'error';
      case 'disbursed':
        return 'primary';
      default:
        return 'secondary';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'paid':
      case 'disbursed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'pending':
      case 'rejected':
      case 'overdue':
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  // Calculate total repayment amount (principal + interest)
  const totalRepayment = loan.amount + (loan.amount * loan.interestRate);
  
  // Get formatted due date if available
  const formattedDueDate = loan.dueDate 
    ? new Date(loan.dueDate).toLocaleDateString('en-KE', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : 'Not set';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Loan Summary</CardTitle>
        <Badge variant={getStatusBadgeVariant(loan.status)} className="flex items-center">
          {getStatusIcon(loan.status)}
          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Loan Amount</h4>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(loan.amount)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Interest Rate</h4>
              <p className="font-semibold">{(loan.interestRate * 100).toFixed(1)}%</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Term</h4>
              <p className="font-semibold">{loan.term} days</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Total Repayment</h4>
              <p className="font-semibold">{formatCurrency(totalRepayment)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Application Date</h4>
              <p className="font-semibold">
                {new Date(loan.applicationDate).toLocaleDateString('en-KE', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          
          {loan.dueDate && (
            <div className="mt-6 flex items-center p-4 bg-primary-50 rounded-md border border-primary-100">
              <Calendar className="h-5 w-5 text-primary-600 mr-2" />
              <div>
                <h4 className="font-medium text-primary-800">Repayment Due</h4>
                <p className="text-sm text-primary-600">{formattedDueDate}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};