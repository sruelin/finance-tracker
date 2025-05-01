// pages/DashboardPage.tsx
import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';

type Transaction = {
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'Income' | 'Spending';
};

const DashboardPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Finance Dashboard</h1>
      <Dashboard
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
};

export default DashboardPage;
