import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
import { toast } from 'sonner';
import {
  DollarSign,
  Plus,
  Edit,
  Save,
  Clock,
  MapPin,
  TrendingUp,
  Calendar,
  Percent,
  Car,
  Users
} from 'lucide-react';

// Mock fare data
const fareRates = [
  {
    id: 1,
    name: 'Base Rate',
    type: 'standard',
    baseFare: 3.50,
    perMile: 1.25,
    perMinute: 0.35,
    minimumFare: 5.00,
    status: 'active',
    lastUpdated: '2024-01-10'
  },
  {
    id: 2,
    name: 'Peak Hours',
    type: 'surge',
    baseFare: 4.50,
    perMile: 1.75,
    perMinute: 0.50,
    minimumFare: 7.00,
    surgeMultiplier: 1.5,
    status: 'active',
    lastUpdated: '2024-01-08'
  },
  {
    id: 3,
    name: 'Weekend Special',
    type: 'promotional',
    baseFare: 2.99,
    perMile: 0.99,
    perMinute: 0.25,
    minimumFare: 4.50,
    discount: 15,
    status: 'scheduled',
    lastUpdated: '2024-01-05'
  },
  {
    id: 4,
    name: 'Premium Service',
    type: 'premium',
    baseFare: 5.00,
    perMile: 2.25,
    perMinute: 0.65,
    minimumFare: 10.00,
    status: 'active',
    lastUpdated: '2024-01-12'
  }
];

// Mock surge zones
const surgeZones = [
  { id: 1, name: 'Downtown', multiplier: 1.8, active: true, rides: 156 },
  { id: 2, name: 'Airport', multiplier: 2.2, active: true, rides: 89 },
  { id: 3, name: 'Business District', multiplier: 1.5, active: false, rides: 0 },
  { id: 4, name: 'University Area', multiplier: 1.3, active: false, rides: 0 },
];

const FaresPage = () => {
  const [editingFare, setEditingFare] = useState(null);
  const [newFare, setNewFare] = useState({
    name: '',
    type: 'standard',
    baseFare: '',
    perMile: '',
    perMinute: '',
    minimumFare: ''
  });

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'default', className: 'bg-success text-success-foreground' },
      inactive: { variant: 'secondary', className: 'bg-muted text-muted-foreground' },
      scheduled: { variant: 'default', className: 'bg-warning text-warning-foreground' }
    };
    return variants[status] || variants.active;
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'surge': return <TrendingUp className="w-4 h-4" />;
      case 'promotional': return <Percent className="w-4 h-4" />;
      case 'premium': return <Car className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const handleSaveFare = (fareId) => {
    toast.success('Fare rates updated successfully');
    setEditingFare(null);
  };

  const handleCreateFare = () => {
    if (!newFare.name || !newFare.baseFare) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.success('New fare rate created successfully');
    setNewFare({
      name: '',
      type: 'standard',
      baseFare: '',
      perMile: '',
      perMinute: '',
      minimumFare: ''
    });
  };

  const toggleSurgeZone = (zoneId) => {
    toast.success('Surge zone status updated');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fares & Rates Management</h1>
          <p className="text-muted-foreground mt-1">Configure pricing strategies and surge zones</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Create New Rate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Fare</p>
                <p className="text-2xl font-bold text-foreground">$12.50</p>
              </div>
              <DollarSign className="h-8 w-8 text-chart-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Surge Zones</p>
                <p className="text-2xl font-bold text-warning">2</p>
              </div>
              <MapPin className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue Today</p>
                <p className="text-2xl font-bold text-success">$24.8k</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Peak Multiplier</p>
                <p className="text-2xl font-bold text-chart-accent">1.8x</p>
              </div>
              <Clock className="h-8 w-8 text-chart-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fare Rates Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Fare Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rate Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Base Fare</TableHead>
                      <TableHead>Per Mile</TableHead>
                      <TableHead>Per Minute</TableHead>
                      <TableHead>Minimum</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fareRates.map((fare) => {
                      const statusBadge = getStatusBadge(fare.status);
                      const isEditing = editingFare === fare.id;
                      
                      return (
                        <TableRow key={fare.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(fare.type)}
                              <span className="font-medium">{fare.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {fare.type.charAt(0).toUpperCase() + fare.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Input className="w-20" defaultValue={fare.baseFare} />
                            ) : (
                              `$${fare.baseFare}`
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Input className="w-20" defaultValue={fare.perMile} />
                            ) : (
                              `$${fare.perMile}`
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Input className="w-20" defaultValue={fare.perMinute} />
                            ) : (
                              `$${fare.perMinute}`
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Input className="w-20" defaultValue={fare.minimumFare} />
                            ) : (
                              `$${fare.minimumFare}`
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusBadge.className}>
                              {fare.status.charAt(0).toUpperCase() + fare.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Button size="sm" onClick={() => handleSaveFare(fare.id)}>
                                <Save className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => setEditingFare(fare.id)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
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

        {/* Create New Fare */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create New Fare Rate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fare-name">Rate Name</Label>
                <Input
                  id="fare-name"
                  placeholder="Enter rate name"
                  value={newFare.name}
                  onChange={(e) => setNewFare({...newFare, name: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="fare-type">Type</Label>
                <Select 
                  value={newFare.type} 
                  onValueChange={(value) => setNewFare({...newFare, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="surge">Surge</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="base-fare">Base Fare</Label>
                  <Input
                    id="base-fare"
                    placeholder="$0.00"
                    value={newFare.baseFare}
                    onChange={(e) => setNewFare({...newFare, baseFare: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="per-mile">Per Mile</Label>
                  <Input
                    id="per-mile"
                    placeholder="$0.00"
                    value={newFare.perMile}
                    onChange={(e) => setNewFare({...newFare, perMile: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="per-minute">Per Minute</Label>
                  <Input
                    id="per-minute"
                    placeholder="$0.00"
                    value={newFare.perMinute}
                    onChange={(e) => setNewFare({...newFare, perMinute: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="minimum-fare">Minimum</Label>
                  <Input
                    id="minimum-fare"
                    placeholder="$0.00"
                    value={newFare.minimumFare}
                    onChange={(e) => setNewFare({...newFare, minimumFare: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={handleCreateFare} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Fare Rate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Surge Zones */}
      <Card>
        <CardHeader>
          <CardTitle>Surge Pricing Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {surgeZones.map((zone) => (
              <Card key={zone.id} className={`hover-lift ${zone.active ? 'border-warning' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium">{zone.name}</h4>
                    </div>
                    <Switch 
                      checked={zone.active} 
                      onCheckedChange={() => toggleSurgeZone(zone.id)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Multiplier:</span>
                      <span className="font-medium text-warning">{zone.multiplier}x</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Active Rides:</span>
                      <span className="font-medium">{zone.rides}</span>
                    </div>
                  </div>
                  
                  {zone.active && (
                    <Badge className="mt-3 w-full justify-center bg-warning text-warning-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      Surge Active
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaresPage;