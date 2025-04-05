import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const data = [
  { category: 'Groceries', amount: 300 },
  { category: 'Rent', amount: 800 },
  { category: 'Dining', amount: 150 },
  { category: 'Fun', amount: 100 },
  { category: 'Subscriptions', amount: 60 },
  { category: 'Coffee', amount: 40 },
];

const SpendingChart = () => {
  return (
    <div style={{ width: '100%', height: 400, marginTop: '2rem' }}>
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
