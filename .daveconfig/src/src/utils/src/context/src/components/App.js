import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import LoanApplication from './components/LoanApplication';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/apply-loan" element={<LoanApplication />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;