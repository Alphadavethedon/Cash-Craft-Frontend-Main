import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { ArrowRight, ShieldCheck, Clock, Smartphone, Wallet } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-900 py-20">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1267325/pexels-photo-1267325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#006600] via-[#cc0000] to-[#000000] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                Quick Loans for Every Kenyan
              </h1>
              <p className="mt-4 text-xl text-primary-100">
                Get instant access to loans from Ksh 1,000 to Ksh 50,000. Fast, secure, and convenient.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <Link to="/auth/register">
                  <Button size="lg" className="shadow-lg transform transition hover:scale-105">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline" className="border-primary-300 text-white hover:bg-primary-700">
                    How It Works
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Kenyan User"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://images.pexels.com/photos/7275383/pexels-photo-7275383.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Kenyan User"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://images.pexels.com/photos/7275384/pexels-photo-7275384.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Kenyan User"
                  />
                </div>
                <p className="ml-4 text-sm text-primary-100">
                  <span className="font-semibold text-white">10,000+</span> satisfied Kenyans
                </p>
              </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-5/12">
              <div className="bg-white rounded-lg shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-all duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading font-bold text-gray-900">Loan Calculator</h3>
                  <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-primary-700" />
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Amount (Ksh)
                    </label>
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      defaultValue="10000"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Ksh 1,000</span>
                      <span>Ksh 10,000</span>
                      <span>Ksh 50,000</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Term (Days)
                    </label>
                    <input
                      type="range"
                      min="7"
                      max="90"
                      step="7"
                      defaultValue="30"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>7 Days</span>
                      <span>30 Days</span>
                      <span>90 Days</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Loan amount:</span>
                    <span className="font-medium">Ksh 10,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Interest (15%):</span>
                    <span className="font-medium">Ksh 1,500</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Processing fee:</span>
                    <span className="font-medium">Ksh 500</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between font-bold">
                    <span>Total repayment:</span>
                    <span>Ksh 12,000</span>
                  </div>
                </div>
                <Link to="/auth/register">
                  <Button fullWidth className="mt-4">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              Why Choose Cash Craft?
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              We offer a simple, fast, and secure way to get the financial support you need.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-gray-900">Quick Approval</h3>
              <p className="mt-2 text-gray-600">
                Get your loan approved in minutes, not days. Fast decisions with minimal paperwork.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-gray-900">Secure Process</h3>
              <p className="mt-2 text-gray-600">
                Your data is protected with bank-level encryption and security measures.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-gray-900">M-Pesa Integration</h3>
              <p className="mt-2 text-gray-600">
                Receive loan disbursements and make repayments easily via M-Pesa.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-gray-900">Flexible Terms</h3>
              <p className="mt-2 text-gray-600">
                Choose repayment periods that work for you, from 7 days up to 3 months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Getting a loan with Cash Craft is quick and easy.
            </p>
          </div>
          
          <div className="mt-16 relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
            
            {/* Steps */}
            <div className="relative">
              {/* Step 1 */}
              <div className="relative md:flex md:items-center mb-12">
                <div className="md:w-1/2 pr-8 md:text-right">
                  <h3 className="text-xl font-heading font-semibold text-primary-700">Create an Account</h3>
                  <p className="mt-2 text-gray-600">
                    Sign up with your email, phone number, and basic personal information. Verification is quick and secure.
                  </p>
                </div>
                <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                  <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    1
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
                  <div className="md:hidden mb-4 flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://images.pexels.com/photos/7275383/pexels-photo-7275383.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Create Account"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative md:flex md:items-center mb-12">
                <div className="md:w-1/2 pr-8 md:text-right md:order-2">
                  <h3 className="text-xl font-heading font-semibold text-primary-700">Apply for a Loan</h3>
                  <p className="mt-2 text-gray-600">
                    Select your loan amount and term, then submit your application. Our system quickly evaluates your eligibility.
                  </p>
                </div>
                <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                  <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    2
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8 md:order-1">
                  <div className="md:hidden mb-4 flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://images.pexels.com/photos/7275384/pexels-photo-7275384.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Apply for Loan"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative md:flex md:items-center mb-12">
                <div className="md:w-1/2 pr-8 md:text-right">
                  <h3 className="text-xl font-heading font-semibold text-primary-700">Receive Funds</h3>
                  <p className="mt-2 text-gray-600">
                    Once approved, funds are sent directly to your M-Pesa account within minutes.
                  </p>
                </div>
                <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                  <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    3
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
                  <div className="md:hidden mb-4 flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Receive Funds"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative md:flex md:items-center">
                <div className="md:w-1/2 pr-8 md:text-right md:order-2">
                  <h3 className="text-xl font-heading font-semibold text-primary-700">Repay Your Loan</h3>
                  <p className="mt-2 text-gray-600">
                    Make repayments via M-Pesa before the due date. Timely repayments help you qualify for higher loan amounts.
                  </p>
                </div>
                <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                  <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    4
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8 md:order-1">
                  <div className="md:hidden mb-4 flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://images.pexels.com/photos/7275386/pexels-photo-7275386.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Repay Loan"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            {/* Kenyan flag colors overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#006600] via-[#cc0000] to-[#000000] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-heading font-bold text-white">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
                Join thousands of Kenyans who trust Cash Craft for their financial needs.
              </p>
              <div className="mt-8">
                <Link to="/auth/register">
                  <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                    Create Account Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about Cash Craft loans.
            </p>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto">
            {/* FAQ Items */}
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button className="flex justify-between items-center w-full px-6 py-4 text-left">
                  <span className="text-lg font-medium text-gray-900">How much can I borrow?</span>
                  <span className="ml-6 flex-shrink-0">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    As a new customer, you can borrow from Ksh 1,000 up to Ksh 10,000. After building a repayment history, your loan limit can increase up to Ksh 50,000.
                  </p>
                </div>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button className="flex justify-between items-center w-full px-6 py-4 text-left">
                  <span className="text-lg font-medium text-gray-900">How long does approval take?</span>
                  <span className="ml-6 flex-shrink-0">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Our automated system evaluates loan applications instantly. Most loans are approved within 5 minutes, and funds are disbursed to your M-Pesa account shortly after approval.
                  </p>
                </div>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button className="flex justify-between items-center w-full px-6 py-4 text-left">
                  <span className="text-lg font-medium text-gray-900">What are the interest rates?</span>
                  <span className="ml-6 flex-shrink-0">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Our interest rates range from 10% to 15% based on the loan term and your credit history. All rates are transparent with no hidden fees, and comply with Central Bank of Kenya regulations.
                  </p>
                </div>
              </div>
              
              {/* FAQ Item 4 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button className="flex justify-between items-center w-full px-6 py-4 text-left">
                  <span className="text-lg font-medium text-gray-900">How do I repay my loan?</span>
                  <span className="ml-6 flex-shrink-0">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Repayments can be made via M-Pesa using our PayBill number. Simply log into your account to see your loan details and payment instructions. You'll also receive reminders before your due date.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/faq" className="text-primary-600 hover:text-primary-800 font-medium">
                View all frequently asked questions
                <ArrowRight className="inline-block ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};