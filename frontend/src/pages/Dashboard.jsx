import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  Car,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Activity
} from 'lucide-react';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 65000, rides: 1200 },
  { month: 'Feb', revenue: 59000, rides: 1100 },
  { month: 'Mar', revenue: 80000, rides: 1500 },
  { month: 'Apr', revenue: 81000, rides: 1600 },
  { month: 'May', revenue: 95000, rides: 1800 },
  { month: 'Jun', revenue: 105000, rides: 2000 },
];

const rideStatusData = [
  { name: 'Completed', value: 1847, color: 'hsl(var(--success))' },
  { name: 'Active', value: 234, color: 'hsl(var(--primary))' },
  { name: 'Cancelled', value: 89, color: 'hsl(var(--destructive))' },
  { name: 'Pending', value: 45, color: 'hsl(var(--warning))' },
];

const recentActivities = [
  { id: 1, type: 'driver_joined', message: 'New driver Sarah Johnson registered', time: '2 mins ago', status: 'success' },
  { id: 2, type: 'dispute', message: 'Dispute filed for ride #12345', time: '5 mins ago', status: 'warning' },
  { id: 3, type: 'payment', message: 'Weekly payout processed: $45,230', time: '1 hour ago', status: 'success' },
  { id: 4, type: 'maintenance', message: 'Vehicle inspection due for 5 cars', time: '2 hours ago', status: 'info' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your fleet.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="animate-glow">
            <Activity className="w-3 h-3 mr-1" />
            Live
          </Badge>
          <Button className="bg-gradient-primary hover:opacity-90">
            <MapPin className="w-4 h-4 mr-2" />
            View Live Map
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift interactive border-metrics-border bg-metrics-bg/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$485,231</div>
            <p className="text-xs text-success flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift interactive border-metrics-border bg-metrics-bg/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Drivers</CardTitle>
            <Car className="h-4 w-4 text-chart-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-success flex items-center mt-1">
              <CheckCircle className="w-3 h-3 mr-1" />
              892 online now
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift interactive border-metrics-border bg-metrics-bg/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Passengers</CardTitle>
            <Users className="h-4 w-4 text-chart-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12,458</div>
            <p className="text-xs text-success flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.3% this week
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift interactive border-metrics-border bg-metrics-bg/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Disputes</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <p className="text-xs text-warning flex items-center mt-1">
              <Clock className="w-3 h-3 mr-1" />
              5 pending review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-foreground">Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 chart-enter">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--chart-primary))" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ride Status Chart */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-foreground">Ride Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 chart-enter">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rideStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {rideStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-success' :
                  activity.status === 'warning' ? 'bg-warning' :
                  activity.status === 'info' ? 'bg-primary' : 'bg-muted-foreground'
                } animate-glow`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;