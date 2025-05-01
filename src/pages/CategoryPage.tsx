// src/pages/CategoryPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

// Utility to group by time
const groupBy = (array: any[], keyGetter: (item: any) => string) => {
  const result: Record<string, any[]> = {};
  array.forEach((item) => {
    const key = keyGetter(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  });
  return result;
};

const CategoryPage = ({ transactions }: { transactions: any[] }) => {
  const { category } = useParams();
  const filtered = transactions.filter(
    (txn) =>
      txn.type === "Spending" &&
      txn.category.toLowerCase() === category?.toLowerCase()
  );

  const byMonth = groupBy(filtered, (txn) => new Date(txn.date).toLocaleString('default', { month: 'short', year: 'numeric' }));
  const byWeek = groupBy(filtered, (txn) => {
    const date = new Date(txn.date);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil(((+date - +firstDayOfYear) / 86400000 + firstDayOfYear.getDay() + 1) / 7);
    return `Week ${week} - ${date.getFullYear()}`;
  });
  const byYear = groupBy(filtered, (txn) => new Date(txn.date).getFullYear().toString());

  const renderSection = (title: string, data: Record<string, any[]>) => (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      {Object.entries(data).map(([period, txns]) => (
        <div key={period} className="mb-4">
          <h3 className="font-medium text-gray-700 mb-2">{period}</h3>
          <ul className="space-y-1">
            {txns.map((txn, idx) => (
              <li key={idx} className="flex justify-between text-sm text-gray-600">
                <span>{txn.date} — {txn.description}</span>
                <span className="text-green-700 font-medium">${txn.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 capitalize">{category} Spending</h1>
      {renderSection('By Month', byMonth)}
      {renderSection('By Week', byWeek)}
      {renderSection('By Year', byYear)}
    </div>
  );
};

export default CategoryPage;
