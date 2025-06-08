import React, { useState } from 'react';
import { applyLoan } from '../services/api';

const LoanApplication = () => {
  const [formData, setFormData] = useState({ amount: '', term: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyLoan({ amount: Number(formData.amount), term: Number(formData.term) });
      alert('Loan application submitted');
    } catch (error) {
      alert('Error applying for loan');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        placeholder="Loan Amount (KES)"
        required
      />
      <input
        type="number"
        value={formData.term}
        onChange={(e) => setFormData({ ...formData, term: e.target.value })}
        placeholder="Loan Term (Months)"
        required
      />
      <button type="submit">Apply</button>
    </form>
  );
};

export default LoanApplication;