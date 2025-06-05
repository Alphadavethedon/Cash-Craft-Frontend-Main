import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LoanSummary } from '../../components/dashboard/LoanSummary';
import { CreditScoreCard } from '../../components/dashboard/CreditScoreCard';
import { LoanApplicationForm } from '../../components/dashboard/LoanApplicationForm';
import { formatCurrency } from '../../lib/utils';
import { dashboardService, creditService, loanService } from '../../services/api';
import { DashboardStats, CreditScore, Loan } from '../../types';
import { Link } from 'react-router-dom';
import { ArrowRight, PlusCircle, TrendingUp, AlertTriangle, CalendarClock, Wallet } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [creditScore, setCreditScore] = useState<CreditScore | null>(null);
  const [activeLoan, setActiveLoan] = useState<Loan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLoanForm, setShowLoanForm] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all required data in parallel
        const [statsData, scoreData, loansData] = await Promise.all([
          dashboardService.getStats(),
          creditService.getUserScore(),
          loanService.getLoans()
        ]);
        
        setStats(statsData);
        setCreditScore(scoreData);
        
        // Find active loan (if any)
        const active = loansData.find(loan => 
          ['approved', 'disbursed', 'pending'].includes(loan.status)
        );
        
        setActiveLoan(active || null);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setError('Failed to load your dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-error-600 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-error-600">Error</h3>
                  <p className="mt-1 text-gray-600">{error}</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-heading font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome back! Here's an overview of your finances.
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Available Credit */}
            <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary-100 text-sm">Available Credit</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {creditScore ? formatCurrency(creditScore.maxLoanAmount) : 'N/A'}
                    </h3>
                  </div>
                  <div className="rounded-full p-2 bg-white bg-opacity-20">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  {!activeLoan && creditScore && (
                    <button
                      onClick={() => setShowLoanForm(true)}
                      className="text-sm text-white flex items-center font-medium"
                    >
                      Apply for a loan <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Active Loans */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active Loans</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-900">
                      {stats?.activeLoans || 0}
                    </h3>
                  </div>
                  <div className="rounded-full p-2 bg-primary-100">
                    <CalendarClock className="h-6 w-6 text-primary-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/loans" className="text-sm text-primary-600 flex items-center font-medium">
                    View all loans <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Total Borrowed */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Borrowed</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-900">
                      {formatCurrency(stats?.totalBorrowed || 0)}
                    </h3>
                  </div>
                  <div className="rounded-full p-2 bg-success-100">
                    <PlusCircle className="h-6 w-6 text-success-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-500">
                    Lifetime total
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Total Repaid */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Repaid</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-900">
                      {formatCurrency(stats?.totalRepaid || 0)}
                    </h3>
                  </div>
                  <div className="rounded-full p-2 bg-warning-100">
                    <TrendingUp className="h-6 w-6 text-warning-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-500">
                    Builds your credit score
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {showLoanForm ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-heading font-semibold text-gray-900">Apply for a Loan</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowLoanForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                  <LoanApplicationForm maxAmount={creditScore?.maxLoanAmount || 10000} />
                </div>
              ) : activeLoan ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-heading font-semibold text-gray-900">Current Loan</h2>
                    <Link to={`/loans/${activeLoan.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                  <LoanSummary loan={activeLoan} />
                </div>
              ) : (
                <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col items-center text-center">
                  <div className="bg-primary-100 p-4 rounded-full">
                    <CreditCard className="h-8 w-8 text-primary-700" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">No Active Loans</h3>
                  <p className="mt-1 text-gray-500">
                    You don't have any active loans at the moment. Apply for a new loan to get started.
                  </p>
                  <Button 
                    className="mt-6"
                    onClick={() => setShowLoanForm(true)}
                  >
                    Apply for a Loan
                  </Button>
                </div>
              )}
              
              {/* Recent Loans */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-heading font-semibold text-gray-900">Recent Loans</h2>
                  <Link to="/loans">
                    <Button variant="link" size="sm" className="text-primary-600 hover:text-primary-700">
                      View All
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  {stats?.loanHistory && stats.loanHistory.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col\" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Term
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {stats.loanHistory.slice(0, 5).map((loan) => (
                            <tr key={loan.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {formatCurrency(loan.amount)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(loan.applicationDate).toLocaleDateString('en-KE', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {loan.term} days
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge 
                                  variant={
                                    loan.status === 'approved' || loan.status === 'paid' 
                                      ? 'success' 
                                      : loan.status === 'pending' 
                                        ? 'warning'
                                        : loan.status === 'overdue' || loan.status === 'rejected'
                                          ? 'error'
                                          : 'primary'
                                  }
                                >
                                  {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500">You don't have any loan history yet.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Upcoming Repayments */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-heading font-semibold text-gray-900">Upcoming Repayments</h2>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  {stats?.repaymentsDue && stats.repaymentsDue.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col\" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Due Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {stats.repaymentsDue.map((repayment) => (
                            <tr key={repayment.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {formatCurrency(repayment.amount)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(repayment.date).toLocaleDateString('en-KE', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge 
                                  variant={
                                    repayment.status === 'completed' 
                                      ? 'success' 
                                      : repayment.status === 'pending' 
                                        ? 'warning'
                                        : 'error'
                                  }
                                >
                                  {repayment.status.charAt(0).toUpperCase() + repayment.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                {repayment.status === 'pending' && (
                                  <Link to={`/repay/${repayment.id}`}>
                                    <Button size="sm">Pay Now</Button>
                                  </Link>
                                )}
                                {repayment.status !== 'pending' && (
                                  <Link to={`/repayments/${repayment.id}`}>
                                    <Button size="sm" variant="outline">Details</Button>
                                  </Link>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500">You don't have any upcoming repayments.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Credit Score */}
              {creditScore && <CreditScoreCard creditScore={creditScore} />}
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      fullWidth
                      onClick={() => setShowLoanForm(true)}
                      disabled={!!activeLoan || showLoanForm}
                    >
                      Apply for a Loan
                    </Button>
                    <Link to="/profile">
                      <Button variant="outline" fullWidth>
                        Update Profile
                      </Button>
                    </Link>
                    <Link to="/repayments/new">
                      <Button variant="outline" fullWidth>
                        Make a Repayment
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Support */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Our support team is available to assist you with any questions.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-primary-600 mr-2" />
                      <span>support@cashcraft.co.ke</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary-600 mr-2" />
                      <span>+254 700 000 000</span>
                    </div>
                    <Link to="/contact">
                      <Button variant="link" className="text-primary-600 p-0">
                        Contact Support
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Import for Phone icon that wasn't imported at the top
import { Phone } from 'lucide-react';