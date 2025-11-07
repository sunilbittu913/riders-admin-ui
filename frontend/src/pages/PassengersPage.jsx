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
import { listRiders, createRider, updateRider, suspendRider, activateRider } from '@/services/riderService';
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
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  CreditCard
} from 'lucide-react';

// Map API rider to UI row
const mapRiderRow = (r) => ({
  id: r.riderId ?? r.id,
  name: r.fullName ?? r.name ?? r.userName ?? 'N/A',
  email: r.email ?? 'N/A',
  phone: r.phoneNumber ?? r.mobile ?? 'N/A',
  status: (r.status || r.accountStatus || 'active').toString().toLowerCase(),
  rating: r.rating ?? r.riderRating ?? 0,
  totalRides: r.totalRides ?? 0,
  totalSpent: r.totalSpent ?? 0,
  joinedDate: r.createdDate?.slice?.(0,10) || '—',
  lastRide: r.lastRideDate?.slice?.(0,10) || '—',
  favoriteLocation: r.favoriteLocation || '—',
});

const PassengersPage = () => {
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
  const [form, setForm] = useState({ fullName: '', email: '', phoneNumber: '' });

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'default', className: 'bg-success text-success-foreground' },
      inactive: { variant: 'secondary', className: 'bg-muted text-muted-foreground' },
      suspended: { variant: 'destructive', className: 'bg-destructive text-destructive-foreground' }
    };
    return variants[status] || variants.active;
  };

  const handleViewProfile = (id) => navigate(`/admin/passengers/${id}`);
  const onNew = () => { setEditing(null); setForm({ fullName: '', email: '', phoneNumber: '' }); setOpen(true); };
  const onEdit = (p) => { setEditing(p); setForm({ fullName: p.name || '', email: p.email || '', phoneNumber: p.phone || '' }); setOpen(true); };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateRider(editing.id, form);
      else await createRider(form);
      toast.success(editing ? 'Passenger updated' : 'Passenger created');
      setOpen(false);
      fetchData();
    } catch { toast.error('Save failed'); }
  };

  const filteredPassengers = useMemo(() => rows.filter(passenger => {
    const matchesSearch = passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         passenger.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || passenger.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [rows, searchTerm, statusFilter]);

  const fetchData = async () => {
      try {
        setLoading(true);
        const { items, total: t } = await listRiders({ search: searchTerm, page, size });
        setRows(items.map(mapRiderRow));
        setTotal(t || items.length || 0);
      } catch (e) {
        toast.error('Failed to load passengers');
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
          <h1 className="text-3xl font-bold text-foreground">Passenger Management</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your passenger base</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90" onClick={onNew}>
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page</span>
              <select className="bg-background border rounded px-2 py-1" value={size} onChange={(e) => { setPage(0); setSize(Number(e.target.value)); }}>
                {[10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
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
          <CardTitle>Passengers ({filteredPassengers.length}) {loading && <span className="text-xs text-muted-foreground">Loading...</span>}</CardTitle>
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
                            <DropdownMenuItem onClick={() => handleViewProfile(passenger.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(passenger)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewProfile(passenger.id)}>
                              <Calendar className="w-4 h-4 mr-2" />
                              View Ride History
                            </DropdownMenuItem>
                            {passenger.status !== 'suspended' ? (
                              <DropdownMenuItem 
                                onClick={async () => { try { await suspendRider(passenger.id); toast.success('Suspended'); fetchData(); } catch { toast.error('Suspend failed'); } }}
                                className="text-destructive"
                              >
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend Account
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={async () => { try { await activateRider(passenger.id); toast.success('Activated'); fetchData(); } catch { toast.error('Activate failed'); } }}
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
          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="text-muted-foreground">Page {page + 1} • Total {total}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => Math.max(0, p-1))}>Prev</Button>
              <Button variant="outline" size="sm" onClick={() => setPage(p => p+1)}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Passenger' : 'New Passenger'}</DialogTitle>
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

export default PassengersPage;