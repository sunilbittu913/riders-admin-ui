import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  Star,
  ExternalLink,
  Github,
  Car,
  BarChart3,
  Users,
  MessageSquare,
  DollarSign,
  Shield,
  FileText,
  Settings,
  Layers,
  Code2,
  Eye,
  ArrowRight,
  ChevronRight,
  Zap,
  Package,
  Filter,
} from 'lucide-react';

const projects = [
  {
    id: 'fleet-dashboard',
    name: 'Fleet Admin Dashboard',
    description: 'A comprehensive admin panel for ride-sharing and transportation platforms. Includes real-time KPIs, driver management, passenger tracking, and operational controls.',
    longDescription: 'Built with React, TailwindCSS, and Recharts, this dashboard provides fleet operators with a centralized command center. Features include live metrics, driver status boards, trip monitoring, and revenue analytics.',
    tags: ['React', 'TailwindCSS', 'Recharts', 'Radix UI'],
    category: 'Admin Panel',
    icon: <Car className="w-6 h-6" />,
    href: '/admin/dashboard',
    stars: 248,
    views: 1840,
    complexity: 'Advanced',
    features: ['Real-time KPIs', 'Driver management', 'Revenue charts', 'Responsive layout'],
    color: 'from-blue-500/20 to-blue-600/5',
  },
  {
    id: 'analytics-reports',
    name: 'Analytics & Reports',
    description: 'Data visualization platform with interactive charts, KPI tracking, trend analysis, and exportable reports for business intelligence.',
    longDescription: 'Powered by Recharts, this module provides deep insights into fleet performance. Area charts, bar charts, pie charts, and data tables work together to surface actionable intelligence.',
    tags: ['Recharts', 'React', 'Data Viz', 'CSV Export'],
    category: 'Analytics',
    icon: <BarChart3 className="w-6 h-6" />,
    href: '/admin/analytics',
    stars: 183,
    views: 1320,
    complexity: 'Advanced',
    features: ['Area & bar charts', 'Pie charts', 'Date filtering', 'Data export'],
    color: 'from-purple-500/20 to-purple-600/5',
  },
  {
    id: 'user-management',
    name: 'User Management System',
    description: 'Role-based access control system with admin user management, permission assignments, and audit logging capabilities.',
    longDescription: 'A complete RBAC implementation featuring user creation, role assignment, permission management, and activity logs. Built with accessible form components and data tables.',
    tags: ['React', 'RBAC', 'Radix UI', 'Forms'],
    category: 'Admin Panel',
    icon: <Users className="w-6 h-6" />,
    href: '/admin/users',
    stars: 156,
    views: 980,
    complexity: 'Intermediate',
    features: ['Role assignment', 'Permission matrix', 'User search', 'Bulk actions'],
    color: 'from-green-500/20 to-green-600/5',
  },
  {
    id: 'dispute-resolution',
    name: 'Dispute Resolution Center',
    description: 'Ticket management system with threaded messaging, status workflows, priority queuing, and automated resolution tracking.',
    longDescription: 'Handles customer and driver disputes with a structured workflow. Supports ticket creation, status transitions, message threads, and resolution documentation.',
    tags: ['React', 'Forms', 'State Management', 'Workflow'],
    category: 'Operations',
    icon: <MessageSquare className="w-6 h-6" />,
    href: '/admin/disputes',
    stars: 124,
    views: 760,
    complexity: 'Intermediate',
    features: ['Ticket workflow', 'Threaded messages', 'Priority queue', 'Resolution tracking'],
    color: 'from-orange-500/20 to-orange-600/5',
  },
  {
    id: 'fare-pricing',
    name: 'Fare & Pricing Engine',
    description: 'Dynamic pricing configuration with surge zone management, promotional rates, commission structures, and automated fare calculations.',
    longDescription: 'Provides fleet operators with granular control over pricing. Configure base rates, surge multipliers, promotional discounts, and driver commission percentages.',
    tags: ['React', 'TailwindCSS', 'Forms', 'Validation'],
    category: 'Operations',
    icon: <DollarSign className="w-6 h-6" />,
    href: '/admin/fares',
    stars: 98,
    views: 640,
    complexity: 'Intermediate',
    features: ['Surge pricing', 'Promo codes', 'Commission config', 'Zone management'],
    color: 'from-yellow-500/20 to-yellow-600/5',
  },
  {
    id: 'auth-system',
    name: 'Authentication System',
    description: 'Complete auth flow with login, registration, password reset, and profile settings. Includes form validation with Zod and react-hook-form.',
    longDescription: 'Production-ready authentication UI with multi-step registration, email verification flow, secure password reset, and profile management. All forms use Zod schema validation.',
    tags: ['React', 'react-hook-form', 'Zod', 'Auth'],
    category: 'Authentication',
    icon: <Shield className="w-6 h-6" />,
    href: '/login',
    stars: 87,
    views: 540,
    complexity: 'Beginner',
    features: ['Login / Register', 'Password reset', 'Zod validation', 'Profile settings'],
    color: 'from-red-500/20 to-red-600/5',
  },
  {
    id: 'driver-management',
    name: 'Driver Management',
    description: 'Comprehensive driver profiles with verification status, trip history, ratings, document management, and real-time location tracking.',
    longDescription: 'Manage your entire driver fleet from a single interface. View driver profiles, verify documents, track performance metrics, and handle onboarding workflows.',
    tags: ['React', 'TailwindCSS', 'Data Tables', 'Filters'],
    category: 'Operations',
    icon: <Car className="w-6 h-6" />,
    href: '/admin/drivers',
    stars: 76,
    views: 490,
    complexity: 'Intermediate',
    features: ['Driver profiles', 'Document verification', 'Performance metrics', 'Bulk operations'],
    color: 'from-cyan-500/20 to-cyan-600/5',
  },
  {
    id: 'reports',
    name: 'Reports Generator',
    description: 'Automated report generation with scheduled exports, custom date ranges, and multi-format output (PDF, CSV, Excel).',
    longDescription: 'Generate comprehensive business reports on demand or on schedule. Supports custom date ranges, department filtering, and multiple export formats.',
    tags: ['React', 'Recharts', 'Export', 'Scheduling'],
    category: 'Analytics',
    icon: <FileText className="w-6 h-6" />,
    href: '/admin/reports',
    stars: 65,
    views: 410,
    complexity: 'Intermediate',
    features: ['Scheduled reports', 'Custom date ranges', 'Multi-format export', 'Email delivery'],
    color: 'from-indigo-500/20 to-indigo-600/5',
  },
];

const complexityColors = {
  Beginner: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  Intermediate: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  Advanced: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
};

const categories = ['All', 'Admin Panel', 'Analytics', 'Operations', 'Authentication'];

const ProjectsShowcasePage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = projects.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Project Templates</h1>
        <p className="text-muted-foreground text-sm">
          {projects.length} full-featured admin modules and templates. Each is production-ready, 
          fully responsive, and built with modern React patterns.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>{filtered.length} projects</span>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(project => (
            <Card key={project.id} className="group hover:border-primary/40 hover:shadow-elegant transition-all duration-200 overflow-hidden">
              <CardContent className="p-0">
                {/* Gradient header */}
                <div className={`bg-gradient-to-br ${project.color} p-5 border-b border-border/50`}>
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 bg-background/80 backdrop-blur rounded-xl flex items-center justify-center text-foreground shadow-sm">
                      {project.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-[10px] px-2 py-0.5 ${complexityColors[project.complexity]}`}>
                        {project.complexity}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-background/60">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {project.features.map(feature => (
                      <div key={feature} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Tags & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3" />
                        {project.stars}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        {project.views.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={project.href} className="block">
                    <Button className="w-full gap-2 bg-gradient-primary hover:opacity-90" size="sm">
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Live Demo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No projects found</p>
          <p className="text-sm mt-1">Try a different search term or category</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
            Clear filters
          </Button>
        </div>
      )}

      {/* GitHub CTA */}
      <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Github className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">Want to contribute?</p>
            <p className="text-xs text-muted-foreground">All templates are open source on GitHub</p>
          </div>
        </div>
        <a href="https://github.com/sunilbittu913/riders-admin-ui" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="gap-2 shrink-0">
            <Github className="w-3.5 h-3.5" />
            View Repository
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ProjectsShowcasePage;
