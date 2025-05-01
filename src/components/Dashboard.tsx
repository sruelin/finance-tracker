// src/pages/DashboardPage.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

type Transaction = {
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'Income' | 'Spending';
};

type Props = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
};

export default function Dashboard({ transactions, setTransactions }: Props) {
  const [form, setForm] = React.useState<Omit<Transaction, 'amount'> & { amount: string }>({
    description: '',
    amount: '',
    date: '',
    category: '',
    type: 'Spending',
  });
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57'];

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      ...form,
      amount: parseFloat(form.amount),
    };
    setTransactions([...transactions, newTransaction]);
    setForm({ description: '', amount: '', date: '', category: '', type: 'Spending' });
  };

  const monthlySummary = transactions.reduce((acc, txn) => {
    const month = new Date(txn.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) acc[month] = { month, Income: 0, Spending: 0 };
    acc[month][txn.type] += txn.amount;
    return acc;
  }, {} as Record<string, { month: string; Income: number; Spending: number }>);

  const monthlyData = Object.values(monthlySummary);

  const pieData = Object.entries(
    transactions.reduce((acc, txn) => {
      if (txn.type === 'Spending' && txn.category) {
        acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
      }
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));
  const savingsPieData = Object.entries(
    transactions.reduce((acc, txn) => {
      if (txn.type === 'Income') {
        acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
      }
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));
  

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <span></span>
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="$0.00"
            required
          />
          <span></span>
        </div>
        <div className="input-wrapper">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <span></span>
        </div>
        <div className="input-wrapper">
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select category</option>
            <option>Food</option>
            <option>Rent</option>
            <option>Transportation</option>
            <option>Utilities</option>
            <option>Entertainment</option>
          </select>
          <span></span>
        </div>
        <div className="input-wrapper">
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="Spending">Spending</option>
            <option value="Income">Income</option>
          </select>
          <span></span>
        </div>
        <button type="submit" className="form-submit">Add</button>
      </form>

      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Transactions</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, idx) => (
                  <tr key={idx}>
                    <td className="date">{txn.date}</td>
                    <td>{txn.description}</td>
                    <td>{txn.category}</td>
                    <td className="amount">${txn.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

       {/* Line Chart: Income vs. Spending Over Time */}
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Income vs Spending Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#34d399"
            strokeWidth={2}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="Spending"
            stroke="#f87171"
            strokeWidth={2}
            name="Spending"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Pie Chart: Spending Breakdown by Category */}
    <div className="bg-white rounded-xl shadow p-6 h-[400px]">
      <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
        <div className="pie-chart-container">
        <div className="pie-chart-card">


      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  </div>
  <h2 className="text-lg font-semibold mb-4">Saving by Category</h2>

  <div className="pie-chart-card">

    {savingsPieData.length === 0 ? (
      <p className="text-center text-gray-500">No savings data</p>
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={savingsPieData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
            onClick={(d) => handleCategoryClick(d.name)}
          >
            {savingsPieData.map((_, i) => (
              <Cell key={i} fill={COLORS[(i) % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    )}
  </div>
</div>
  


);
} 