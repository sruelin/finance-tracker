// pages/DashboardPage.tsx
import React from 'react';
import Dashboard from '../components/Dashboard';


const DashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Finance Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
