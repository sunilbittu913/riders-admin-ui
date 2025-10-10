import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  Search,
  Menu,
  Settings,
  LogOut,
  User,
  AlertCircle
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search drivers, passengers, trips..."
              className="pl-10 w-64 lg:w-80"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <h4 className="font-semibold text-sm mb-2">Notifications</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2 p-2 rounded-lg bg-muted/50">
                    <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Driver License Expiring</p>
                      <p className="text-xs text-muted-foreground">John Smith's license expires in 3 days</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-2 rounded-lg bg-muted/50">
                    <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">New Dispute Filed</p>
                      <p className="text-xs text-muted-foreground">Passenger complaint about ride #12345</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-2 rounded-lg bg-muted/50">
                    <AlertCircle className="w-4 h-4 text-success mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Peak Hours Alert</p>
                      <p className="text-xs text-muted-foreground">High demand detected in downtown area</p>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="hidden sm:block text-sm font-medium">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;