import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Home,
  Layers,
  FolderOpen,
  Code2,
  Palette,
  LayoutGrid,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Github,
  Star,
  Package,
  Zap,
  Shield,
  Car,
  BarChart3,
  Users,
  Settings,
  ChevronDown,
} from 'lucide-react';

const navCategories = [
  {
    label: 'Navigation',
    items: [
      { name: 'Home', href: '/showcase', icon: Home },
      { name: 'Components', href: '/showcase/components', icon: Layers },
      { name: 'Projects', href: '/showcase/projects', icon: FolderOpen },
    ],
  },
  {
    label: 'UI Categories',
    items: [
      { name: 'Layout', href: '/showcase/components?cat=layout', icon: LayoutGrid },
      { name: 'Forms & Inputs', href: '/showcase/components?cat=forms', icon: Code2 },
      { name: 'Data Display', href: '/showcase/components?cat=data', icon: BarChart3 },
      { name: 'Feedback', href: '/showcase/components?cat=feedback', icon: Zap },
      { name: 'Navigation', href: '/showcase/components?cat=navigation', icon: ChevronRight },
      { name: 'Overlays', href: '/showcase/components?cat=overlays', icon: Layers },
      { name: 'Theming', href: '/showcase/components?cat=theming', icon: Palette },
    ],
  },
  {
    label: 'Admin Modules',
    items: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutGrid },
      { name: 'Drivers', href: '/admin/drivers', icon: Car },
      { name: 'Users', href: '/admin/users', icon: Users },
      { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ],
  },
];

const ShowcaseLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (label) => {
    setCollapsedCategories(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
          <Link to="/showcase" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-foreground tracking-tight">FleetUI</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">beta</Badge>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="px-3 py-3 border-b border-sidebar-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              className="pl-8 h-8 text-sm bg-sidebar-accent border-sidebar-border"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {navCategories.map((category) => (
            <div key={category.label}>
              <button
                onClick={() => toggleCategory(category.label)}
                className="flex items-center justify-between w-full px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                {category.label}
                <ChevronDown
                  className={cn(
                    'w-3 h-3 transition-transform',
                    collapsedCategories[category.label] ? '-rotate-90' : ''
                  )}
                />
              </button>
              {!collapsedCategories[category.label] && (
                <div className="mt-1 space-y-0.5">
                  {category.items.map((item) => {
                    const isActive = location.pathname === item.href || location.pathname + location.search === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm font-medium transition-all',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
                        )}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-sidebar-border">
          <a
            href="https://github.com/sunilbittu913/riders-admin-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2.5 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div className="hidden lg:flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>FleetUI</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium capitalize">
                {location.pathname.split('/').filter(Boolean).pop() || 'Home'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/sunilbittu913/riders-admin-ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
                <Github className="w-3.5 h-3.5" />
                <span className="text-xs">GitHub</span>
              </Button>
            </a>
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ShowcaseLayout;
