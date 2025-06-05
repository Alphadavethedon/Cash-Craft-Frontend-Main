import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { mpesaService, repaymentService } from '../../services/api';
import { formatCurrency } from '../../lib/utils';
import { Smartphone, AlertCircle } from 'lucide-react';

interface RepaymentFormProps {
  loanId: string;
  amount: number;
  onSuccess?: () => void;
}

interface RepaymentFormData {
  phoneNumber: string;
}

export const RepaymentForm: React.FC<RepaymentFormProps> = ({ loanId, amount, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [stkStatus, setStkStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RepaymentFormData>({
    defaultValues: {
      phoneNumber: ''
    }
  });
  
  const onSubmit = async (data: RepaymentFormData) => {
    setIsLoading(true);
    setApiError(null);
    setStkStatus('processing');
    
    try {
      // Format phone number to ensure it's in the correct format
      let phoneNumber = data.phoneNumber;
      if (phoneNumber.startsWith('0')) {
        phoneNumber = `254${phoneNumber.substring(1)}`;
      } else if (!phoneNumber.startsWith('254')) {
        phoneNumber = `254${phoneNumber}`;
      }
      
      // Initiate STK Push
      const response = await mpesaService.initiateSTK(
        phoneNumber,
        amount,
        `Loan Repayment - ${loanId.substring(0, 8)}`
      );
      
      setCheckoutRequestId(response.CheckoutRequestID);
      
      // Poll for status
      let attempts = 0;
      const maxAttempts = 10;
      const pollInterval = setInterval(async () => {
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          setStkStatus('error');
          setApiError('The payment request timed out. Please check your M-Pesa and try again if necessary.');
          setIsLoading(false);
          return;
        }
        
        try {
          const statusResponse = await mpesaService.checkSTKStatus(response.CheckoutRequestID);
          if (statusResponse.ResultCode === '0') {
            clearInterval(pollInterval);
            setStkStatus('success');
            setIsLoading(false);
            
            // Record the repayment
            await repaymentService.makeRepayment({
              loanId,
              amount,
              method: 'mpesa',
              reference: statusResponse.MpesaReceiptNumber
            });
            
            if (onSuccess) {
              onSuccess();
            } else {
              navigate('/dashboard');
            }
          } else if (statusResponse.ResultCode === '1032') {
            // Transaction cancelled by user
            clearInterval(pollInterval);
            setStkStatus('error');
            setApiError('M-Pesa payment was cancelled or timed out. Please try again.');
            setIsLoading(false);
          }
        } catch (error) {
          // Continue polling even if there's an error checking status
        }
      }, 3000);
      
    } catch (error: any) {
      setStkStatus('error');
      setApiError(
        error.response?.data?.message || 
        'Failed to initiate M-Pesa payment. Please try again.'
      );
    } finally {
      if (stkStatus !== 'success') {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Repayment</CardTitle>
      </CardHeader>
      <CardContent>
        {stkStatus === 'success' ? (
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100">
              <svg className="h-6 w-6 text-success-600\" fill="none\" viewBox="0 0 24 24\" stroke="currentColor">
                <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Payment Successful</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your repayment of {formatCurrency(amount)} has been processed successfully.
              Thank you for your payment!
            </p>
            <div className="mt-6">
              <Button onClick={() => navigate('/dashboard')}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {apiError && (
              <div className="bg-error-50 border-l-4 border-error-600 p-4">
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
            
            {stkStatus === 'processing' ? (
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
                  <svg className="animate-spin h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Processing Payment</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Please check your phone and enter your M-Pesa PIN when prompted.
                  This may take a few moments to complete.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-primary-50 p-4 rounded-md border border-primary-100">
                  <h3 className="font-medium text-primary-800 mb-2">Payment Details</h3>
                  <p className="text-sm text-primary-700">
                    You are about to make a repayment of <span className="font-semibold">{formatCurrency(amount)}</span> for your loan.
                  </p>
                  <p className="text-sm text-primary-700 mt-2">
                    An M-Pesa STK push will be sent to your phone. Please enter your M-Pesa PIN when prompted.
                  </p>
                </div>
                
                <Input
                  label="M-Pesa Phone Number"
                  type="tel"
                  placeholder="07XXXXXXXX or 2547XXXXXXXX"
                  leftIcon={<Smartphone className="h-5 w-5 text-gray-400" />}
                  helperText="Enter the phone number linked to your M-Pesa account"
                  error={errors.phoneNumber?.message}
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^(?:(?:\+?254)|0)7\d{8}$/,
                      message: 'Please enter a valid Kenyan phone number'
                    }
                  })}
                />
                
                <Button type="submit" fullWidth isLoading={isLoading}>
                  Pay {formatCurrency(amount)} via M-Pesa
                </Button>
              </>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  );
};