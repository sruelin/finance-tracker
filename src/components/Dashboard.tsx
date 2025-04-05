// components/Dashboard.tsx
import React from 'react';
import BudgetSummary from './budgetSummary';
import SpendingChart from './SpendingChart';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BudgetSummary />
      <SpendingChart />
    </div>
  );
};

export default Dashboard;
