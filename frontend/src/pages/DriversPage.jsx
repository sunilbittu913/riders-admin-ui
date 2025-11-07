import React, { useEffect, useState } from 'react';
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
import { listDrivers } from '@/services/driverService';
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Car,
  Phone,
  Mail
} from 'lucide-react';

// API-driven data
const mapDriverRow = (d) => ({
  id: d.driverId ?? d.id,
  name: d.fullName ?? d.name ?? 'N/A',
  email: d.email ?? 'N/A',
  phone: d.phoneNumber ?? 'N/A',
  status: d.signupStatus?.toLowerCase?.() || 'offline',
  rating: d.driverRating ?? 0,
  totalRides: d.totalRides ?? 0,
  vehicle: [d.vehicleMake, d.vehicleModel].filter(Boolean).join(' ') || '—',
  licenseExpiry: d.drivingLicenseExpiry || '—',
  joinedDate: d.createdDate?.slice?.(0, 10) || '—',
  earnings: d.earnings ?? 0,
});

const DriversPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const getStatusBadge = (status) => {
    const variants = {
      online: { variant: 'default', className: 'bg-success text-success-foreground' },
      busy: { variant: 'secondary', className: 'bg-warning text-warning-foreground' },
      offline: { variant: 'secondary', className: 'bg-muted text-muted-foreground' },
      suspended: { variant: 'destructive', className: 'bg-destructive text-destructive-foreground' }
    };
    return variants[status] || variants.offline;
  };

  const handleDriverAction = (action, driverId, driverName) => {
    toast.success(`${action} action completed for ${driverName}`);
  };

  const filteredDrivers = rows.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { items } = await listDrivers({ search: searchTerm, page, size });
        setRows(items.map(mapDriverRow));
      } catch (e) {
        toast.error('Failed to load drivers');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm, page]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Driver Management</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your driver network</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Driver
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Drivers</p>
                <p className="text-2xl font-bold text-foreground">1,247</p>
              </div>
              <Car className="h-8 w-8 text-chart-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online Now</p>
                <p className="text-2xl font-bold text-success">892</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-chart-accent">4.7</p>
              </div>
              <Star className="h-8 w-8 text-chart-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold text-destructive">15</p>
              </div>
              <Ban className="h-8 w-8 text-destructive" />
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
                placeholder="Search drivers by name or email..."
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
                <DropdownMenuItem onClick={() => setStatusFilter('online')}>Online</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('busy')}>Busy</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('offline')}>Offline</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('suspended')}>Suspended</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Drivers ({filteredDrivers.length}) {loading && <span className="text-xs text-muted-foreground">Loading...</span>}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Total Rides</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => {
                  const statusBadge = getStatusBadge(driver.status);
                  return (
                    <TableRow key={driver.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {driver.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-1 text-muted-foreground" />
                            {driver.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-1 text-muted-foreground" />
                            {driver.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusBadge.className}>
                          {driver.status === 'online' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {driver.status === 'busy' && <Clock className="w-3 h-3 mr-1" />}
                          {driver.status === 'offline' && <XCircle className="w-3 h-3 mr-1" />}
                          {driver.status === 'suspended' && <Ban className="w-3 h-3 mr-1" />}
                          {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-chart-accent mr-1" />
                          {driver.rating}
                        </div>
                      </TableCell>
                      <TableCell>{driver.totalRides.toLocaleString()}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{driver.vehicle}</p>
                          <p className="text-sm text-muted-foreground">License exp: {driver.licenseExpiry}</p>
                        </div>
                      </TableCell>
                      <TableCell>${driver.earnings.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDriverAction('View Profile', driver.id, driver.name)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDriverAction('Edit Details', driver.id, driver.name)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            {driver.status !== 'suspended' ? (
                              <DropdownMenuItem 
                                onClick={() => handleDriverAction('Suspend', driver.id, driver.name)}
                                className="text-destructive"
                              >
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend Driver
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleDriverAction('Activate', driver.id, driver.name)}
                                className="text-success"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Activate Driver
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

export default DriversPage;