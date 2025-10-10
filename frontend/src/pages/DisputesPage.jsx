import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Check,
  X,
  Clock,
  AlertTriangle,
  Users,
  Car,
  DollarSign,
  Calendar,
  Send
} from 'lucide-react';

// Mock disputes data
const disputesData = [
  {
    id: 'DSP-001',
    rideId: 'RD-12345',
    passenger: { name: 'Alice Johnson', id: 'P-001' },
    driver: { name: 'John Smith', id: 'D-001' },
    issue: 'fare_dispute',
    title: 'Overcharged for ride',
    description: 'The fare charged was $25.50 but the estimated fare was $18.00. The route taken seemed longer than necessary.',
    status: 'open',
    priority: 'high',
    amount: 25.50,
    submittedAt: '2024-01-12T10:30:00Z',
    messages: [
      { sender: 'passenger', message: 'I was overcharged for this ride', timestamp: '2024-01-12T10:30:00Z' },
      { sender: 'support', message: 'We are investigating your concern', timestamp: '2024-01-12T11:00:00Z' }
    ]
  },
  {
    id: 'DSP-002',
    rideId: 'RD-12346',
    passenger: { name: 'Robert Smith', id: 'P-002' },
    driver: { name: 'Sarah Johnson', id: 'D-002' },
    issue: 'service_quality',
    title: 'Unprofessional driver behavior',
    description: 'Driver was rude and played loud music despite requests to lower the volume.',
    status: 'in_progress',
    priority: 'medium',
    amount: null,
    submittedAt: '2024-01-11T15:45:00Z',
    messages: [
      { sender: 'passenger', message: 'Driver was very unprofessional', timestamp: '2024-01-11T15:45:00Z' },
      { sender: 'support', message: 'We have contacted the driver for their response', timestamp: '2024-01-11T16:00:00Z' },
      { sender: 'driver', message: 'There was a misunderstanding, I apologize', timestamp: '2024-01-11T17:30:00Z' }
    ]
  },
  {
    id: 'DSP-003',
    rideId: 'RD-12347',
    passenger: { name: 'Maria Garcia', id: 'P-003' },
    driver: { name: 'Mike Chen', id: 'D-003' },
    issue: 'safety_concern',
    title: 'Unsafe driving',
    description: 'Driver was speeding and using phone while driving. I felt unsafe throughout the ride.',
    status: 'resolved',
    priority: 'high',
    amount: null,
    submittedAt: '2024-01-10T09:20:00Z',
    resolution: 'Driver received safety training and warning. Passenger received full refund.',
    messages: [
      { sender: 'passenger', message: 'Driver was driving unsafely', timestamp: '2024-01-10T09:20:00Z' },
      { sender: 'support', message: 'This is a serious concern, we will investigate immediately', timestamp: '2024-01-10T09:30:00Z' },
      { sender: 'support', message: 'Issue resolved. Driver has been warned and retrained.', timestamp: '2024-01-10T14:00:00Z' }
    ]
  },
  {
    id: 'DSP-004',
    rideId: 'RD-12348',
    passenger: { name: 'James Wilson', id: 'P-004' },
    driver: { name: 'Emma Wilson', id: 'D-004' },
    issue: 'no_show',
    title: 'Driver never arrived',
    description: 'Waited for 20 minutes but driver never showed up. Was still charged cancellation fee.',
    status: 'open',
    priority: 'medium',
    amount: 5.00,
    submittedAt: '2024-01-12T08:15:00Z',
    messages: [
      { sender: 'passenger', message: 'Driver never arrived but I was charged', timestamp: '2024-01-12T08:15:00Z' }
    ]
  }
];

const DisputesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const getStatusBadge = (status) => {
    const variants = {
      open: { variant: 'destructive', className: 'bg-destructive text-destructive-foreground' },
      in_progress: { variant: 'default', className: 'bg-warning text-warning-foreground' },
      resolved: { variant: 'default', className: 'bg-success text-success-foreground' },
      closed: { variant: 'secondary', className: 'bg-muted text-muted-foreground' }
    };
    return variants[status] || variants.open;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      high: { className: 'bg-destructive text-destructive-foreground' },
      medium: { className: 'bg-warning text-warning-foreground' },
      low: { className: 'bg-muted text-muted-foreground' }
    };
    return variants[priority] || variants.medium;
  };

  const getIssueIcon = (issue) => {
    switch(issue) {
      case 'fare_dispute': return <DollarSign className="w-4 h-4" />;
      case 'service_quality': return <Users className="w-4 h-4" />;
      case 'safety_concern': return <AlertTriangle className="w-4 h-4" />;
      case 'no_show': return <Car className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const handleDisputeAction = (action, disputeId) => {
    toast.success(`Dispute ${action} successfully`);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success('Message sent successfully');
    setNewMessage('');
  };

  const filteredDisputes = disputesData.filter(dispute => {
    const matchesSearch = 
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dispute Resolution</h1>
          <p className="text-muted-foreground mt-1">Manage and resolve customer disputes</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Disputes</p>
                <p className="text-2xl font-bold text-destructive">23</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-warning">15</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-success">8</p>
              </div>
              <Check className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Resolution Time</p>
                <p className="text-2xl font-bold text-chart-primary">4.2h</p>
              </div>
              <Calendar className="h-8 w-8 text-chart-primary" />
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
                placeholder="Search disputes by ID, passenger, driver, or title..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  {statusFilter === 'all' ? 'All Status' : statusFilter.replace('_', ' ').charAt(0).toUpperCase() + statusFilter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('open')}>Open</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('in_progress')}>In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('resolved')}>Resolved</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('closed')}>Closed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Disputes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Disputes ({filteredDisputes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispute ID</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Passenger</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDisputes.map((dispute) => {
                  const statusBadge = getStatusBadge(dispute.status);
                  const priorityBadge = getPriorityBadge(dispute.priority);
                  
                  return (
                    <TableRow key={dispute.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getIssueIcon(dispute.issue)}
                          <span className="font-medium">{dispute.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{dispute.title}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {dispute.issue.replace('_', ' ')}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {dispute.passenger.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{dispute.passenger.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {dispute.driver.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{dispute.driver.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusBadge.className}>
                          {dispute.status.replace('_', ' ').charAt(0).toUpperCase() + dispute.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityBadge.className}>
                          {dispute.priority.charAt(0).toUpperCase() + dispute.priority.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {dispute.amount ? `$${dispute.amount}` : '-'}
                      </TableCell>
                      <TableCell>
                        {new Date(dispute.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[600px] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Dispute Details - {dispute.id}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Issue Type</p>
                                      <p className="capitalize">{dispute.issue.replace('_', ' ')}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                                      <Badge className={statusBadge.className}>
                                        {dispute.status.replace('_', ' ')}
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                                    <p className="text-sm bg-muted/50 p-3 rounded-lg">{dispute.description}</p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Messages</p>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                      {dispute.messages.map((message, idx) => (
                                        <div key={idx} className="flex space-x-2 text-sm">
                                          <Badge variant="outline" className="capitalize">{message.sender}</Badge>
                                          <p className="flex-1">{message.message}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="flex space-x-2">
                                    <Input
                                      placeholder="Type your response..."
                                      value={newMessage}
                                      onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <Button onClick={handleSendMessage}>
                                      <Send className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  
                                  {dispute.status === 'resolved' && dispute.resolution && (
                                    <div className="mt-4 p-3 bg-success/10 rounded-lg">
                                      <p className="text-sm font-medium text-success">Resolution</p>
                                      <p className="text-sm">{dispute.resolution}</p>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            {dispute.status !== 'resolved' && (
                              <>
                                <DropdownMenuItem onClick={() => handleDisputeAction('resolved', dispute.id)}>
                                  <Check className="w-4 h-4 mr-2" />
                                  Mark Resolved
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDisputeAction('closed', dispute.id)}>
                                  <X className="w-4 h-4 mr-2" />
                                  Close Dispute
                                </DropdownMenuItem>
                              </>
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

export default DisputesPage;