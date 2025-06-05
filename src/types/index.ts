export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  profileCompleted: boolean;
  createdAt: string;
}

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  term: number; // in days
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'paid' | 'overdue';
  interestRate: number;
  applicationDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  dueDate?: string;
  purpose?: string;
  repaymentMethod?: string;
}

export interface Repayment {
  id: string;
  loanId: string;
  userId: string;
  amount: number;
  date: string;
  method: 'mpesa' | 'bank' | 'cash';
  status: 'pending' | 'completed' | 'failed';
  reference?: string;
}

export interface CreditScore {
  userId: string;
  score: number;
  maxLoanAmount: number;
  lastUpdated: string;
  factors: {
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }[];
}

export interface DashboardStats {
  activeLoans: number;
  totalBorrowed: number;
  totalRepaid: number;
  availableCredit: number;
  repaymentsDue: Repayment[];
  loanHistory: Loan[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}