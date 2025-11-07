import React, { useEffect, useMemo, useState } from 'react';
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
import { listDrivers, createDriver, updateDriver, deleteDriver } from '@/services/driverService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ fullName: '', email: '', phoneNumber: '', vehicleMake: '', vehicleModel: '' });

  const getStatusBadge = (status) => {
    const variants = {
      online: { variant: 'default', className: 'bg-success text-success-foreground' },
      busy: { variant: 'secondary', className: 'bg-warning text-warning-foreground' },
      offline: { variant: 'secondary', className: 'bg-muted text-muted-foreground' },
      suspended: { variant: 'destructive', className: 'bg-destructive text-destructive-foreground' }
    };
    return variants[status] || variants.offline;
  };

  const handleViewProfile = (id) => navigate(`/admin/drivers/${id}`);
  const onNew = () => { setEditing(null); setForm({ fullName: '', email: '', phoneNumber: '', vehicleMake: '', vehicleModel: '' }); setOpen(true); };
  const onEdit = (d) => { setEditing(d); setForm({ fullName: d.name || '', email: d.email || '', phoneNumber: d.phone || '', vehicleMake: d.vehicle.split(' ')[0] || '', vehicleModel: d.vehicle.split(' ').slice(1).join(' ') || '' }); setOpen(true); };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateDriver(editing.id, form);
      else await createDriver(form);
      toast.success(editing ? 'Driver updated' : 'Driver created');
      setOpen(false);
      fetchData();
    } catch { toast.error('Save failed'); }
  };

  const filteredDrivers = useMemo(() => rows.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [rows, searchTerm, statusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { items, total: t } = await listDrivers({ search: searchTerm, page, size });
      setRows(items.map(mapDriverRow));
      setTotal(t || items.length || 0);
    } catch (e) {
      toast.error('Failed to load drivers');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchData(); }, [searchTerm, page, size]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Driver Management</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your driver network</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90" onClick={onNew}>
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page</span>
              <select className="bg-background border rounded px-2 py-1" value={size} onChange={(e) => { setPage(0); setSize(Number(e.target.value)); }}>
                {[10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
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
                            <DropdownMenuItem onClick={() => handleViewProfile(driver.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(driver)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={async () => { if (!window.confirm('Delete this driver?')) return; try { await deleteDriver(driver.id); toast.success('Driver deleted'); fetchData(); } catch { toast.error('Delete failed'); } }}
                              className="text-destructive"
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              Delete Driver
                            </DropdownMenuItem>
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Driver' : 'New Driver'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={form.fullName} onChange={(e) => setForm(f => ({...f, fullName: e.target.value}))} required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm(f => ({...f, email: e.target.value}))} required />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input value={form.phoneNumber} onChange={(e) => setForm(f => ({...f, phoneNumber: e.target.value}))} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vehicle Make</Label>
                <Input value={form.vehicleMake} onChange={(e) => setForm(f => ({...f, vehicleMake: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label>Vehicle Model</Label>
                <Input value={form.vehicleModel} onChange={(e) => setForm(f => ({...f, vehicleModel: e.target.value}))} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-gradient-primary">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriversPage;