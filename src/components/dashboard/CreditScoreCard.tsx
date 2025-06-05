import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { CreditScore } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CreditScoreCardProps {
  creditScore: CreditScore;
}

export const CreditScoreCard: React.FC<CreditScoreCardProps> = ({ creditScore }) => {
  // Calculate score color based on score value
  const getScoreColor = (score: number) => {
    if (score >= 700) return 'text-success-600';
    if (score >= 500) return 'text-warning-600';
    return 'text-error-600';
  };

  const getScoreRing = (score: number) => {
    if (score >= 700) return 'border-success-500';
    if (score >= 500) return 'border-warning-500';
    return 'border-error-500';
  };

  // Calculate score text
  const getScoreText = (score: number) => {
    if (score >= 700) return 'Excellent';
    if (score >= 600) return 'Good';
    if (score >= 500) return 'Fair';
    if (score >= 300) return 'Poor';
    return 'Very Poor';
  };

  // Get icon for factor impact
  const getFactorIcon = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-success-500" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-error-500" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <div className={`h-36 w-36 rounded-full border-8 ${getScoreRing(creditScore.score)} flex items-center justify-center mb-4`}>
            <div className="text-center">
              <p className={`text-3xl font-bold ${getScoreColor(creditScore.score)}`}>
                {creditScore.score}
              </p>
              <p className="text-sm text-gray-500">out of 850</p>
            </div>
          </div>
          <h3 className={`font-semibold text-xl ${getScoreColor(creditScore.score)}`}>
            {getScoreText(creditScore.score)}
          </h3>
          <p className="text-gray-500 mt-1">Last updated: {new Date(creditScore.lastUpdated).toLocaleDateString()}</p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-3">Available Credit</h4>
          <p className="text-2xl font-bold text-primary-700">{formatCurrency(creditScore.maxLoanAmount)}</p>
          <p className="text-sm text-gray-500">Maximum loan amount you can apply for</p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-3">Key Factors</h4>
          <ul className="space-y-3">
            {creditScore.factors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <div className="mt-0.5 mr-2">{getFactorIcon(factor.impact)}</div>
                <div>
                  <p className="font-medium text-gray-800">{factor.name}</p>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};