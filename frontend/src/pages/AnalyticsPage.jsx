import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
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
  TrendingUp,
  TrendingDown,
  Users,
  Car,
  DollarSign,
  Clock,
  Star,
  MapPin,
  Calendar,
  Download,
  Activity,
  Target
} from 'lucide-react';

// Mock analytics data
const revenueData = [
  { month: 'Jan', revenue: 65000, rides: 1200, drivers: 89 },
  { month: 'Feb', revenue: 59000, rides: 1100, drivers: 92 },
  { month: 'Mar', revenue: 80000, rides: 1500, drivers: 95 },
  { month: 'Apr', revenue: 81000, rides: 1600, drivers: 98 },
  { month: 'May', revenue: 95000, rides: 1800, drivers: 105 },
  { month: 'Jun', revenue: 105000, rides: 2000, drivers: 112 }
];

const hourlyData = [
  { hour: '00:00', rides: 12, revenue: 180 },
  { hour: '04:00', rides: 8, revenue: 120 },
  { hour: '08:00', rides: 45, revenue: 675 },
  { hour: '12:00', rides: 78, revenue: 1170 },
  { hour: '16:00', rides: 92, revenue: 1380 },
  { hour: '20:00', rides: 156, revenue: 2340 },
  { hour: '23:00', rides: 89, revenue: 1335 }
];

const cityData = [
  { name: 'Downtown', rides: 2847, revenue: 42705, color: 'hsl(var(--chart-primary))' },
  { name: 'Airport', rides: 1234, revenue: 24680, color: 'hsl(var(--chart-secondary))' },
  { name: 'University', rides: 989, revenue: 14835, color: 'hsl(var(--chart-accent))' },
  { name: 'Suburbs', rides: 756, revenue: 11340, color: 'hsl(var(--chart-muted))' },
  { name: 'Business District', rides: 2156, revenue: 32340, color: 'hsl(var(--warning))' }
];

const driverPerformance = [
  { name: 'Top 10%', drivers: 125, avgRating: 4.9, avgEarnings: 2850 },
  { name: 'Top 25%', drivers: 312, avgRating: 4.7, avgEarnings: 2340 },
  { name: 'Average', drivers: 624, avgRating: 4.5, avgEarnings: 1890 },
  { name: 'Below Average', drivers: 186, avgRating: 4.2, avgEarnings: 1420 }
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Comprehensive insights into your fleet performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="animate-glow">
            <Activity className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="hover-lift interactive border-metrics-border bg-metrics-bg/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$485,231</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5% vs last month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-chart-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift interactive border-metrics-border bg-metrics-bg/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                <p className="text-2xl font-bold text-foreground">11,247</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.3% vs last month
                </p>
              </div>
              <Car className="h-8 w-8 text-chart-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift interactive border-metrics-border bg-metrics-bg/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Drivers</p>
                <p className="text-2xl font-bold text-foreground">1,247</p>
                <p className="text-xs text-destructive flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -2.1% vs last month
                </p>
              </div>
              <Users className="h-8 w-8 text-chart-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift interactive border-metrics-border bg-metrics-bg/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-foreground">4.7</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <Star className="w-3 h-3 mr-1" />
                  +0.2 vs last month
                </p>
              </div>
              <Star className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift interactive border-metrics-border bg-metrics-bg/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Trip Time</p>
                <p className="text-2xl font-bold text-foreground">18.5m</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  -1.2m vs last month
                </p>
              </div>
              <Clock className="h-8 w-8 text-chart-muted" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Rides Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-foreground">Revenue & Rides Trend</CardTitle>
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
                    <linearGradient id="colorRides" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-secondary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-secondary))" stopOpacity={0.1}/>
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
                  <Area 
                    type="monotone" 
                    dataKey="rides" 
                    stroke="hsl(var(--chart-secondary))" 
                    fillOpacity={1} 
                    fill="url(#colorRides)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-foreground">Hourly Activity Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 chart-enter">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="rides" fill="hsl(var(--chart-primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* City Performance and Driver Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Performance by City Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cityData.map((city, index) => (
                <div key={city.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: city.color }}
                    />
                    <div>
                      <p className="font-medium">{city.name}</p>
                      <p className="text-sm text-muted-foreground">{city.rides} rides</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${city.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Driver Performance Tiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {driverPerformance.map((tier, index) => (
                <div key={tier.name} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{tier.name}</h4>
                    <Badge variant="outline">{tier.drivers} drivers</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Avg Rating</p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-warning mr-1" />
                        <span className="font-medium">{tier.avgRating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Earnings</p>
                      <p className="font-medium">${tier.avgEarnings}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Quick Analytics Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Custom Date Range</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Download className="w-5 h-5" />
              <span className="text-sm">Export CSV</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Zone Analysis</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">Forecast Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;