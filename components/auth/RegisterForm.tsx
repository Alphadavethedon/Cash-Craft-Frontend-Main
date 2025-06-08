import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RegisterCredentials } from '../../types';

export const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterCredentials & { confirmPassword: string }>();
  
  const password = watch('password');
  
  const onSubmit = async (data: RegisterCredentials & { confirmPassword: string }) => {
    setIsLoading(true);
    setApiError(null);
    
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registerData } = data;
    
    try {
      await register(registerData);
      navigate('/dashboard');
    } catch (error: any) {
      setApiError(
        error.response?.data?.message || 
        'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
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
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            label="First Name"
            type="text"
            autoComplete="given-name"
            leftIcon={<User className="h-5 w-5 text-gray-400" />}
            error={errors.firstName?.message}
            {...registerField('firstName', {
              required: 'First name is required',
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters'
              }
            })}
          />
          
          <Input
            label="Last Name"
            type="text"
            autoComplete="family-name"
            leftIcon={<User className="h-5 w-5 text-gray-400" />}
            error={errors.lastName?.message}
            {...registerField('lastName', {
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters'
              }
            })}
          />
        </div>
        
        <Input
          label="Email Address"
          type="email"
          autoComplete="email"
          leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
          error={errors.email?.message}
          {...registerField('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        
        <Input
          label="Phone Number"
          type="tel"
          autoComplete="tel"
          leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
          helperText="Format: 07XXXXXXXX or +2547XXXXXXXX"
          error={errors.phoneNumber?.message}
          {...registerField('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^(?:\+254|0)7\d{8}$/,
              message: 'Please enter a valid Kenyan phone number'
            }
          })}
        />
        
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
          helperText="Must be at least 6 characters"
          error={errors.password?.message}
          {...registerField('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
          error={errors.confirmPassword?.message}
          {...registerField('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || 'The passwords do not match'
          })}
        />
        
        <div>
          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Already have an account?</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Link to="/auth/login">
            <Button variant="outline" fullWidth>
              Sign in to your account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};