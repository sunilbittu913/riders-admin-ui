import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight,
  Layers,
  FolderOpen,
  Sparkles,
  Eye,
  Code2,
  Zap,
  Shield,
  Car,
  BarChart3,
  Users,
  MessageSquare,
  DollarSign,
  FileText,
  Settings,
  LayoutGrid,
  ChevronRight,
  Star,
  Package,
  Github,
} from 'lucide-react';

const featuredComponents = [
  {
    name: 'Admin Layout',
    description: 'Full-featured sidebar layout with collapsible navigation, breadcrumbs, and responsive mobile support.',
    category: 'Layout',
    views: 1240,
    icon: <LayoutGrid className="w-5 h-5" />,
    tags: ['sidebar', 'responsive', 'navigation'],
    href: '/showcase/components?cat=layout',
    preview: (
      <div className="bg-muted/40 rounded-lg p-3 space-y-2">
        <div className="flex gap-2">
          <div className="w-16 bg-primary/20 rounded h-20" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 bg-muted-foreground/20 rounded w-3/4" />
            <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
            <div className="h-3 bg-muted-foreground/20 rounded w-2/3" />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'Data Table',
    description: 'Sortable, filterable data table with pagination, row selection, and bulk actions.',
    category: 'Data Display',
    views: 987,
    icon: <FileText className="w-5 h-5" />,
    tags: ['table', 'pagination', 'filter'],
    href: '/showcase/components?cat=data',
    preview: (
      <div className="bg-muted/40 rounded-lg p-3 space-y-1.5">
        <div className="h-3 bg-primary/30 rounded w-full" />
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-2">
            <div className="h-2.5 bg-muted-foreground/20 rounded w-1/4" />
            <div className="h-2.5 bg-muted-foreground/20 rounded w-1/3" />
            <div className="h-2.5 bg-muted-foreground/20 rounded w-1/4" />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'Analytics Dashboard',
    description: 'Real-time charts and KPI cards with Recharts integration, trend indicators, and date filtering.',
    category: 'Data Display',
    views: 856,
    icon: <BarChart3 className="w-5 h-5" />,
    tags: ['charts', 'recharts', 'kpi'],
    href: '/showcase/components?cat=data',
    preview: (
      <div className="bg-muted/40 rounded-lg p-3">
        <div className="flex gap-2 mb-2">
          {[1, 2].map(i => (
            <div key={i} className="flex-1 bg-primary/10 rounded p-2">
              <div className="h-4 w-10 bg-primary/40 rounded mb-1" />
              <div className="h-2 w-8 bg-muted-foreground/20 rounded" />
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1 h-10">
          {[4, 7, 5, 8, 6, 9, 7].map((h, i) => (
            <div key={i} className="flex-1 bg-primary/40 rounded-t" style={{ height: `${h * 10}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'Form Builder',
    description: 'Accessible form components with validation, error states, and react-hook-form integration.',
    category: 'Forms & Inputs',
    views: 743,
    icon: <Code2 className="w-5 h-5" />,
    tags: ['forms', 'validation', 'accessible'],
    href: '/showcase/components?cat=forms',
    preview: (
      <div className="bg-muted/40 rounded-lg p-3 space-y-2">
        <div className="h-7 bg-background border border-border rounded px-2 flex items-center">
          <div className="h-2 w-20 bg-muted-foreground/20 rounded" />
        </div>
        <div className="h-7 bg-background border border-border rounded px-2 flex items-center">
          <div className="h-2 w-16 bg-muted-foreground/20 rounded" />
        </div>
        <div className="h-7 bg-primary rounded flex items-center justify-center">
          <div className="h-2 w-12 bg-white/60 rounded" />
        </div>
      </div>
    ),
  },
  {
    name: 'Modal & Dialogs',
    description: 'Accessible dialog system with confirmation, form, and alert variants built on Radix UI.',
    category: 'Overlays',
    views: 621,
    icon: <Layers className="w-5 h-5" />,
    tags: ['dialog', 'modal', 'radix'],
    href: '/showcase/components?cat=overlays',
    preview: (
      <div className="bg-muted/40 rounded-lg p-3 flex items-center justify-center">
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg w-full max-w-[140px]">
          <div className="h-2.5 w-16 bg-foreground/30 rounded mb-2" />
          <div className="h-2 w-full bg-muted-foreground/20 rounded mb-1" />
          <div className="h-2 w-3/4 bg-muted-foreground/20 rounded mb-3" />
          <div className="flex gap-1.5">
            <div className="flex-1 h-5 bg-muted rounded" />
            <div className="flex-1 h-5 bg-primary rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'Badge & Status',
    description: 'Versatile badge components for status indicators, labels, and notification counts.',
    category: 'Feedback',
    views: 512,
    icon: <Zap className="w-5 h-5" />,
    tags: ['badge', 'status', 'indicator'],
    href: '/showcase/components?cat=feedback',
    preview: (
      <div className="bg-muted/40 rounded-lg p-3 flex flex-wrap gap-2 items-center justify-center">
        {['Active', 'Pending', 'Error', 'Info'].map((label, i) => (
          <span
            key={i}
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              i === 0 ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
              i === 1 ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
              i === 2 ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
              'bg-blue-500/20 text-blue-600 dark:text-blue-400'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    ),
  },
];

const projectTemplates = [
  {
    name: 'Fleet Admin Dashboard',
    description: 'Full-featured admin panel for ride-sharing platforms with driver management, analytics, and dispute resolution.',
    tags: ['React', 'TailwindCSS', 'Recharts'],
    icon: <Car className="w-6 h-6" />,
    href: '/admin/dashboard',
    stars: 248,
  },
  {
    name: 'User Management System',
    description: 'Role-based access control with admin users, permissions, and audit logging.',
    tags: ['React', 'Radix UI', 'RBAC'],
    icon: <Users className="w-6 h-6" />,
    href: '/admin/users',
    stars: 183,
  },
  {
    name: 'Analytics & Reports',
    description: 'Data visualization platform with real-time charts, KPI tracking, and exportable reports.',
    tags: ['Recharts', 'React', 'CSV Export'],
    icon: <BarChart3 className="w-6 h-6" />,
    href: '/admin/analytics',
    stars: 156,
  },
  {
    name: 'Dispute Resolution',
    description: 'Ticket management system with messaging, status tracking, and automated workflows.',
    tags: ['React', 'Forms', 'State Management'],
    icon: <MessageSquare className="w-6 h-6" />,
    href: '/admin/disputes',
    stars: 124,
  },
  {
    name: 'Fare & Pricing Engine',
    description: 'Dynamic pricing configuration with surge zones, promotional rates, and commission tracking.',
    tags: ['React', 'TailwindCSS', 'Forms'],
    icon: <DollarSign className="w-6 h-6" />,
    href: '/admin/fares',
    stars: 98,
  },
  {
    name: 'Auth & Profile System',
    description: 'Login, registration, password reset, and profile settings with form validation.',
    tags: ['React', 'react-hook-form', 'Zod'],
    icon: <Shield className="w-6 h-6" />,
    href: '/login',
    stars: 87,
  },
];

const stats = [
  { value: '40+', label: 'UI Components' },
  { value: '6', label: 'Project Templates' },
  { value: '100%', label: 'Open Source' },
  { value: '0', label: 'Dependencies on paid services' },
];

const ShowcaseHomePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-5 pt-4">
        <Badge className="bg-primary/10 text-primary border-primary/20 gap-1.5">
          <Sparkles className="w-3 h-3" />
          Open Source UI Components
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          UI Building Blocks for
          <span className="bg-gradient-primary bg-clip-text text-transparent"> Fleet & Admin Apps</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A curated collection of production-ready React components, admin templates, and design patterns
          built with TailwindCSS and Radix UI. Copy, paste, and ship faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link to="/showcase/components">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 gap-2">
              <Layers className="w-4 h-4" />
              Browse Components
            </Button>
          </Link>
          <Link to="/showcase/projects">
            <Button size="lg" variant="outline" className="gap-2">
              <FolderOpen className="w-4 h-4" />
              View Projects
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center p-4 rounded-xl bg-card border border-border">
            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Featured Components */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-foreground">UI Components</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Production-ready, accessible, and customizable</p>
          </div>
          <Link to="/showcase/components">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              View all
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredComponents.map((comp, i) => (
            <Link key={i} to={comp.href}>
              <Card className="group hover:border-primary/50 hover:shadow-elegant transition-all duration-200 cursor-pointer h-full">
                <CardContent className="p-4 space-y-3">
                  {/* Preview */}
                  <div className="rounded-lg overflow-hidden border border-border/50 bg-muted/20">
                    {comp.preview}
                  </div>
                  {/* Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center text-primary">
                          {comp.icon}
                        </div>
                        <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {comp.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        {comp.views.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{comp.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {comp.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* Project Templates */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-foreground">Project Templates</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Full-featured admin modules ready to use</p>
          </div>
          <Link to="/showcase/projects">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              View all
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectTemplates.map((project, i) => (
            <Link key={i} to={project.href}>
              <Card className="group hover:border-primary/50 hover:shadow-elegant transition-all duration-200 cursor-pointer h-full">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {project.icon}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" />
                      {project.stars}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
          <Github className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Open Source & Free</h3>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          All components are open source. Clone the repository, customize to your needs, and deploy anywhere.
        </p>
        <div className="flex gap-3 justify-center">
          <a href="https://github.com/sunilbittu913/riders-admin-ui" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-primary hover:opacity-90 gap-2">
              <Github className="w-4 h-4" />
              Star on GitHub
            </Button>
          </a>
          <Link to="/showcase/components">
            <Button variant="outline" className="gap-2">
              <Package className="w-4 h-4" />
              Browse All
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ShowcaseHomePage;
