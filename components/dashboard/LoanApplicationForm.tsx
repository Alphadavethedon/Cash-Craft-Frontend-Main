import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { loanService } from '../../services/api';
import { AlertCircle } from 'lucide-react';

interface LoanApplicationFormProps {
  maxAmount: number;
}

interface LoanFormData {
  amount: number;
  term: number;
  purpose: string;
}

export const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ maxAmount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState(30);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoanFormData>({
    defaultValues: {
      amount: 5000,
      term: 30,
      purpose: ''
    }
  });
  
  const watchAmount = watch('amount', 5000);
  
  // Calculate interest rate based on term
  const getInterestRate = (term: number) => {
    if (term <= 14) return 0.10; // 10%
    if (term <= 30) return 0.15; // 15%
    return 0.20; // 20%
  };
  
  const interestRate = getInterestRate(selectedTerm);
  const interestAmount = watchAmount * interestRate;
  const processingFee = Math.min(500, watchAmount * 0.05); // 5% up to 500 KES
  const totalRepayment = Number(watchAmount) + interestAmount + processingFee;
  
  const onSubmit = async (data: LoanFormData) => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      const loanData = {
        ...data,
        interestRate
      };
      
      await loanService.applyForLoan(loanData);
      navigate('/dashboard');
    } catch (error: any) {
      setApiError(
        error.response?.data?.message || 
        'Failed to submit loan application. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for a Loan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {apiError && (
            <div className="bg-error-50 border-l-4 border-error-600 p-4 mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-error-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-error-700">{apiError}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Loan Amount (KES {watchAmount.toLocaleString()})
            </label>
            <input
              type="range"
              min="1000"
              max={maxAmount}
              step="1000"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              {...register('amount', {
                required: 'Loan amount is required',
                min: {
                  value: 1000,
                  message: 'Minimum loan amount is KES 1,000'
                },
                max: {
                  value: maxAmount,
                  message: `Maximum loan amount is KES ${maxAmount.toLocaleString()}`
                }
              })}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>KES 1,000</span>
              <span>KES {maxAmount.toLocaleString()}</span>
            </div>
            {errors.amount && <p className="text-sm text-error-600">{errors.amount.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Loan Term ({selectedTerm} days)
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className={`py-2 px-4 border rounded-md text-sm font-medium ${
                  selectedTerm === 7 
                    ? 'border-primary-600 bg-primary-50 text-primary-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTerm(7)}
              >
                7 Days
              </button>
              <button
                type="button"
                className={`py-2 px-4 border rounded-md text-sm font-medium ${
                  selectedTerm === 30 
                    ? 'border-primary-600 bg-primary-50 text-primary-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTerm(30)}
              >
                30 Days
              </button>
              <button
                type="button"
                className={`py-2 px-4 border rounded-md text-sm font-medium ${
                  selectedTerm === 90 
                    ? 'border-primary-600 bg-primary-50 text-primary-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTerm(90)}
              >
                90 Days
              </button>
            </div>
            <input
              type="hidden"
              value={selectedTerm}
              {...register('term', {
                required: 'Loan term is required'
              })}
            />
          </div>
          
          <Input
            label="Purpose of Loan"
            placeholder="e.g., Business, Education, Medical, etc."
            error={errors.purpose?.message}
            {...register('purpose', {
              required: 'Loan purpose is required',
              minLength: {
                value: 3,
                message: 'Please provide more details about the purpose'
              }
            })}
          />
          
          <div className="bg-gray-50 rounded-md p-4">
            <h4 className="font-medium text-gray-900 mb-2">Loan Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
                <span>KES {watchAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest ({(interestRate * 100).toFixed(0)}%):</span>
                <span>KES {interestAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Fee:</span>
                <span>KES {processingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                <span>Total Repayment:</span>
                <span>KES {totalRepayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Due Date:</span>
                <span>
                  {new Date(Date.now() + selectedTerm * 24 * 60 * 60 * 1000).toLocaleDateString('en-KE', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
          
          <Button type="submit" fullWidth isLoading={isLoading}>
            Submit Loan Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};