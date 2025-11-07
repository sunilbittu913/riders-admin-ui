import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getRider, deleteRider } from '@/services/riderService';
import { ArrowLeft, Mail, Phone, Users, Star, MapPin, Calendar, Trash2 } from 'lucide-react';

const RiderDetailsPage = () => {
  const { id } = useParams();
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const data = await getRider(id);
      setRider(data);
    } catch (e) {
      toast.error('Failed to load rider');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const status = (rider?.status || rider?.accountStatus || 'active')?.toString()?.toLowerCase?.() || 'active';
  const badgeClass = status === 'active'
    ? 'bg-success text-success-foreground'
    : 'bg-muted text-muted-foreground';

  const onDelete = async () => {
    if (!window.confirm('Delete this rider?')) return;
    try {
      await deleteRider(id);
      toast.success('Rider deleted');
      navigate('/admin/passengers');
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/passengers"><Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button></Link>
          <h1 className="text-3xl font-bold text-foreground">Rider Details</h1>
          {loading && <span className="text-xs text-muted-foreground">Loading...</span>}
        </div>
        <div className="flex gap-2">
          <Badge className={badgeClass}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-xl font-semibold">{rider?.fullName || rider?.name || '—'}</div>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center"><Mail className="w-4 h-4 mr-2" />{rider?.email || '—'}</div>
              <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{rider?.phoneNumber || rider?.mobile || '—'}</div>
              <div className="flex items-center"><Users className="w-4 h-4 mr-2" />Rides: {rider?.totalRides ?? '—'}</div>
              <div className="flex items-center"><Star className="w-4 h-4 mr-2" />Rating: {rider?.riderRating ?? rider?.rating ?? '—'}</div>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />Joined: {rider?.createdDate?.slice?.(0,10) || '—'}</div>
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />Last Ride: {rider?.lastRideDate?.slice?.(0,10) || '—'}</div>
            <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />Favorite: {rider?.favoriteLocation || '—'}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiderDetailsPage;
