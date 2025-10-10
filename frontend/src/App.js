import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import AdminLayout from '@/components/layout/AdminLayout';
import Dashboard from '@/pages/Dashboard';
import DriversPage from '@/pages/DriversPage';
import PassengersPage from '@/pages/PassengersPage';
import FaresPage from '@/pages/FaresPage';
import DisputesPage from '@/pages/DisputesPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import ReportsPage from '@/pages/ReportsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="drivers" element={<DriversPage />} />
            <Route path="passengers" element={<PassengersPage />} />
            <Route path="fares" element={<FaresPage />} />
            <Route path="disputes" element={<DisputesPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;