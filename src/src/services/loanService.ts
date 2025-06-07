import api from '../utils/api';

export const applyForLoan = (amount: number, term: number) =>
  api.post('/loans/apply', { amount, term });