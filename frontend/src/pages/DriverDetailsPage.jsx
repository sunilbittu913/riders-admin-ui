import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getDriver, suspendDriver, activateDriver } from '@/services/driverService';
import { ArrowLeft, Mail, Phone, Car, Star, Calendar, CheckCircle, Ban } from 'lucide-react';

const DriverDetailsPage = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getDriver(id);
      setDriver(data);
    } catch (e) {
      toast.error('Failed to load driver');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [id]);

  const status = (driver?.signupStatus || driver?.status || 'offline').toString().toLowerCase();
  const badgeClass = status === 'online'
    ? 'bg-success text-success-foreground'
    : status === 'suspended'
    ? 'bg-destructive text-destructive-foreground'
    : 'bg-muted text-muted-foreground';

  const onSuspendToggle = async () => {
    try {
      if (status !== 'suspended') { await suspendDriver(id); toast.success('Driver suspended'); }
      else { await activateDriver(id); toast.success('Driver activated'); }
      await load();
    } catch { toast.error('Operation failed'); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/drivers"><Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button></Link>
          <h1 className="text-3xl font-bold text-foreground">Driver Details</h1>
          {loading && <span className="text-xs text-muted-foreground">Loading...</span>}
        </div>
        <div className="flex gap-2">
          <Badge className={badgeClass}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
          <Button variant={status !== 'suspended' ? 'destructive' : 'default'} onClick={onSuspendToggle}>
            {status !== 'suspended' ? <Ban className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
            {status !== 'suspended' ? 'Suspend' : 'Activate'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-xl font-semibold">{driver?.fullName || driver?.name || '—'}</div>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center"><Mail className="w-4 h-4 mr-2" />{driver?.email || '—'}</div>
              <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{driver?.phoneNumber || '—'}</div>
              <div className="flex items-center"><Star className="w-4 h-4 mr-2" />Rating: {driver?.driverRating ?? driver?.rating ?? '—'}</div>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center"><Car className="w-4 h-4 mr-2" />Vehicle: {[driver?.vehicleMake, driver?.vehicleModel].filter(Boolean).join(' ') || '—'}</div>
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />Joined: {driver?.createdDate?.slice?.(0,10) || '—'}</div>
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />License Exp: {driver?.drivingLicenseExpiry || '—'}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDetailsPage;
