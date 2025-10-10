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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  CreditCard
} from 'lucide-react';

// Mock passenger data
const passengersData = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    rating: 4.6,
    totalRides: 87,
    totalSpent: 2450,
    joinedDate: '2023-01-15',
    lastRide: '2024-01-10',
    paymentMethod: 'Credit Card',
    favoriteLocation: 'Downtown'
  },
  {
    id: 2,
    name: 'Robert Smith',
    email: 'robert.s@email.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    rating: 4.8,
    totalRides: 156,
    totalSpent: 4890,
    joinedDate: '2022-11-20',
    lastRide: '2024-01-12',
    paymentMethod: 'PayPal',
    favoriteLocation: 'Airport'
  },
  {
    id: 3,
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    phone: '+1 (555) 345-6789',
    status: 'active',
    rating: 4.9,
    totalRides: 243,
    totalSpent: 7650,
    joinedDate: '2022-08-05',
    lastRide: '2024-01-11',
    paymentMethod: 'Credit Card',
    favoriteLocation: 'Shopping Mall'
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james.w@email.com',
    phone: '+1 (555) 456-7890',
    status: 'suspended',
    rating: 3.2,
    totalRides: 34,
    totalSpent: 890,
    joinedDate: '2023-09-12',
    lastRide: '2023-12-15',
    paymentMethod: 'Credit Card',
    favoriteLocation: 'University'
  },
  {
    id: 5,
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '+1 (555) 567-8901',
    status: 'active',
    rating: 4.7,
    totalRides: 198,
    totalSpent: 5420,
    joinedDate: '2023-02-28',
    lastRide: '2024-01-09',
    paymentMethod: 'Digital Wallet',
    favoriteLocation: 'Business District'
  }
];

const PassengersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'default', className: 'bg-success text-success-foreground' },
      inactive: { variant: 'secondary', className: 'bg-muted text-muted-foreground' },
      suspended: { variant: 'destructive', className: 'bg-destructive text-destructive-foreground' }
    };
    return variants[status] || variants.active;
  };

  const handlePassengerAction = (action, passengerId, passengerName) => {
    toast.success(`${action} action completed for ${passengerName}`);
  };

  const filteredPassengers = passengersData.filter(passenger => {
    const matchesSearch = passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         passenger.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || passenger.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Passenger Management</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your passenger base</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Passenger
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Passengers</p>
                <p className="text-2xl font-bold text-foreground">12,458</p>
              </div>
              <Users className="h-8 w-8 text-chart-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active This Week</p>
                <p className="text-2xl font-bold text-success">8,342</p>
              </div>
              <Calendar className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-chart-accent">4.6</p>
              </div>
              <Star className="h-8 w-8 text-chart-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-chart-secondary">$485k</p>
              </div>
              <CreditCard className="h-8 w-8 text-chart-secondary" />
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
                placeholder="Search passengers by name or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  {statusFilter === 'all' ? 'All Status' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>Inactive</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('suspended')}>Suspended</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Passengers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Passengers ({filteredPassengers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Passenger</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Total Rides</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Ride</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPassengers.map((passenger) => {
                  const statusBadge = getStatusBadge(passenger.status);
                  return (
                    <TableRow key={passenger.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{passenger.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{passenger.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {passenger.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-1 text-muted-foreground" />
                            {passenger.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-1 text-muted-foreground" />
                            {passenger.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusBadge.className}>
                          {passenger.status.charAt(0).toUpperCase() + passenger.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-chart-accent mr-1" />
                          {passenger.rating}
                        </div>
                      </TableCell>
                      <TableCell>{passenger.totalRides}</TableCell>
                      <TableCell>${passenger.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{passenger.lastRide}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 mr-1" />
                            {passenger.favoriteLocation}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handlePassengerAction('View Profile', passenger.id, passenger.name)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePassengerAction('Edit Details', passenger.id, passenger.name)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePassengerAction('View Ride History', passenger.id, passenger.name)}>
                              <Calendar className="w-4 h-4 mr-2" />
                              View Ride History
                            </DropdownMenuItem>
                            {passenger.status !== 'suspended' ? (
                              <DropdownMenuItem 
                                onClick={() => handlePassengerAction('Suspend', passenger.id, passenger.name)}
                                className="text-destructive"
                              >
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend Account
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handlePassengerAction('Activate', passenger.id, passenger.name)}
                                className="text-success"
                              >
                                <Users className="w-4 h-4 mr-2" />
                                Activate Account
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PassengersPage;