import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import AdminLayout from '@/components/layout/AdminLayout';
import ShowcaseLayout from '@/components/layout/ShowcaseLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterRiderPage from '@/pages/RegisterRiderPage';
import RegisterAdminPage from '@/pages/RegisterAdminPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import Dashboard from '@/pages/Dashboard';
import DriversPage from '@/pages/DriversPage';
import DriverDetailsPage from '@/pages/DriverDetailsPage';
import PassengersPage from '@/pages/PassengersPage';
import RiderDetailsPage from '@/pages/RiderDetailsPage';
import FaresPage from '@/pages/FaresPage';
import DisputesPage from '@/pages/DisputesPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import ReportsPage from '@/pages/ReportsPage';
import AdminUsersPage from '@/pages/AdminUsersPage';
import ProfileSettingsPage from '@/pages/ProfileSettingsPage';
import RolesPage from '@/pages/RolesPage';
import ShowcaseHomePage from '@/pages/showcase/ShowcaseHomePage';
import ComponentsGalleryPage from '@/pages/showcase/ComponentsGalleryPage';
import ProjectsShowcasePage from '@/pages/showcase/ProjectsShowcasePage';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="fleet-command-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground transition-colors">
          <Routes>
            {/* Root redirect to showcase */}
            <Route path="/" element={<Navigate to="/showcase" replace />} />

            {/* Showcase Routes (21st.dev-style) */}
            <Route path="/showcase" element={<ShowcaseLayout />}>
              <Route index element={<ShowcaseHomePage />} />
              <Route path="components" element={<ComponentsGalleryPage />} />
              <Route path="projects" element={<ProjectsShowcasePage />} />
            </Route>

            {/* Legacy Landing & Auth */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register/rider" element={<RegisterRiderPage />} />
            <Route path="/register/admin" element={<RegisterAdminPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="roles" element={<RolesPage />} />
              <Route path="profile" element={<ProfileSettingsPage />} />
              <Route path="drivers" element={<DriversPage />} />
              <Route path="drivers/:id" element={<DriverDetailsPage />} />
              <Route path="passengers" element={<PassengersPage />} />
              <Route path="passengers/:id" element={<RiderDetailsPage />} />
              <Route path="fares" element={<FaresPage />} />
              <Route path="disputes" element={<DisputesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="reports" element={<ReportsPage />} />
            </Route>
            
            {/* Legacy Admin Routes (redirect to new paths) */}
            <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/drivers" element={<Navigate to="/admin/drivers" replace />} />
            <Route path="/passengers" element={<Navigate to="/admin/passengers" replace />} />
            <Route path="/fares" element={<Navigate to="/admin/fares" replace />} />
            <Route path="/disputes" element={<Navigate to="/admin/disputes" replace />} />
            <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
            <Route path="/reports" element={<Navigate to="/admin/reports" replace />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
