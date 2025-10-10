import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import AdminLayout from '@/components/layout/AdminLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterRiderPage from '@/pages/RegisterRiderPage';
import RegisterAdminPage from '@/pages/RegisterAdminPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
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
    <ThemeProvider defaultTheme="dark" storageKey="fleet-command-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground transition-colors">
          <Routes>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="drivers" element={<DriversPage />} />
              <Route path="passengers" element={<PassengersPage />} />
              <Route path="fares" element={<FaresPage />} />
              <Route path="disputes" element={<DisputesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="reports" element={<ReportsPage />} />
            </Route>
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;