import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { toast } from 'sonner';
import {
  Search,
  Download,
  Calendar,
  FileText,
  DollarSign,
  Car,
  Users,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Mock ride history data
const rideHistoryData = [
  {
    id: 'RD-12345',
    passenger: { name: 'Alice Johnson', id: 'P-001' },
    driver: { name: 'John Smith', id: 'D-001' },
    pickupLocation: '123 Main St, Downtown',
    dropoffLocation: '456 Oak Ave, Uptown', 
    distance: 8.5,
    duration: 18,
    fare: 25.50,
    status: 'completed',
    rating: 4.8,
    startTime: '2024-01-12T10:30:00Z',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'RD-12346',
    passenger: { name: 'Robert Smith', id: 'P-002' },
    driver: { name: 'Sarah Johnson', id: 'D-002' },
    pickupLocation: 'Airport Terminal 1',
    dropoffLocation: '789 Business Blvd',
    distance: 12.3,
    duration: 25,
    fare: 42.75,
    status: 'completed',
    rating: 4.9,
    startTime: '2024-01-12T09:15:00Z',
    paymentMethod: 'PayPal'
  },
  {
    id: 'RD-12347',
    passenger: { name: 'Maria Garcia', id: 'P-003' },
    driver: { name: 'Mike Chen', id: 'D-003' },
    pickupLocation: '321 University Dr',
    dropoffLocation: '654 Shopping Mall',
    distance: 6.2,
    duration: 15,
    fare: 18.25,
    status: 'cancelled',
    rating: null,
    startTime: '2024-01-12T11:20:00Z',
    paymentMethod: 'Credit Card'
  }
];

// Mock financial data
const financialData = [
  { month: 'Jan', grossRevenue: 125000, netRevenue: 87500, commissions: 37500 },
  { month: 'Feb', grossRevenue: 118000, netRevenue: 82600, commissions: 35400 },
  { month: 'Mar', grossRevenue: 145000, netRevenue: 101500, commissions: 43500 },
  { month: 'Apr', grossRevenue: 152000, netRevenue: 106400, commissions: 45600 },
  { month: 'May', grossRevenue: 168000, netRevenue: 117600, commissions: 50400 },
  { month: 'Jun', grossRevenue: 175000, netRevenue: 122500, commissions: 52500 }
];

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');

  const getStatusBadge = (status) => {
    const variants = {
      completed: { className: 'bg-success text-success-foreground' },
      cancelled: { className: 'bg-destructive text-destructive-foreground' },
      in_progress: { className: 'bg-warning text-warning-foreground' }
    };
    return variants[status] || variants.completed;
  };

  const handleExportReport = (type) => {
    toast.success(`${type} report exported successfully`);
  };

  const filteredRides = rideHistoryData.filter(ride => {
    const matchesSearch = 
      ride.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ride.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Comprehensive reporting and data insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => handleExportReport('All Reports')} className="bg-gradient-primary hover:opacity-90">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ride-history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ride-history">Ride History</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="operational">Operational Reports</TabsTrigger>
        </TabsList>

        {/* Ride History Tab */}
        <TabsContent value="ride-history" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover-lift interactive">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                    <p className="text-2xl font-bold text-foreground">11,247</p>
                  </div>
                  <Car className="h-8 w-8 text-chart-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift interactive">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-success">10,892</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift interactive">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Cancelled</p>
                    <p className="text-2xl font-bold text-destructive">355</p>
                  </div>
                  <XCircle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift interactive">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Duration</p>
                    <p className="text-2xl font-bold text-foreground">18.5m</p>
                  </div>
                  <Clock className="h-8 w-8 text-chart-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ride ID, passenger, or driver..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => handleExportReport('Ride History')} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ride History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Ride History ({filteredRides.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ride ID</TableHead>
                      <TableHead>Passenger</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Fare</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRides.map((ride) => {
                      const statusBadge = getStatusBadge(ride.status);
                      return (
                        <TableRow key={ride.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{ride.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {ride.passenger.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{ride.passenger.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {ride.driver.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{ride.driver.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-48">
                              <div className="flex items-center text-sm">
                                <MapPin className="w-3 h-3 mr-1 text-success" />
                                <span className="truncate">{ride.pickupLocation}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3 mr-1 text-destructive" />
                                <span className="truncate">{ride.dropoffLocation}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{ride.distance} mi</TableCell>
                          <TableCell>{ride.duration} min</TableCell>
                          <TableCell>${ride.fare}</TableCell>
                          <TableCell>
                            <Badge className={statusBadge.className}>
                              {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {ride.rating ? (
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-warning mr-1" />
                                {ride.rating}
                              </div>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(ride.startTime).toLocaleDateString()}<br />
                            {new Date(ride.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Reports Tab */}
        <TabsContent value="financial" className="space-y-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 chart-enter">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialData}>
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
                    <Bar dataKey="grossRevenue" fill="hsl(var(--chart-primary))" name="Gross Revenue" />
                    <Bar dataKey="netRevenue" fill="hsl(var(--chart-secondary))" name="Net Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operational Reports Tab */}
        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExportReport('Daily Operations')}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Daily Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExportReport('Financial Summary')}
            >
              <DollarSign className="w-5 h-5" />
              <span className="text-sm">Financial</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExportReport('Driver Performance')}
            >
              <Users className="w-5 h-5" />
              <span className="text-sm">Driver Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExportReport('Custom Report')}
            >
              <FileText className="w-5 h-5" />
              <span className="text-sm">Custom</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;