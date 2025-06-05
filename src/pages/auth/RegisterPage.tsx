import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { CreditCard } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <CreditCard className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-3 text-center text-3xl font-heading font-extrabold text-gray-900">
          Create your Cash Craft account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Get started with quick access to loans and financial tools.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};