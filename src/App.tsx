import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout'
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import Expenses from './components/Expenses';
import Reports from './components/Reports';
import Settings from './components/Settings';
import CategoryPage from './pages/CategoryPage';
import { useState } from 'react';
import DashboardPage from './components/Dashboard';

type Transaction = {
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'Income' | 'Spending';
};
function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard transactions={transactions}setTransactions={setTransactions}  />} />
          <Route path="budget" element={<Budget />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/CategoryPage" element={<CategoryPage transactions={transactions} />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
