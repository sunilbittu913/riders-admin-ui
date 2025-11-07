import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getUser } from '@/services/authService';
import { employeeChangePassword, findAllPermissionsByEmployeeId, findAllByEmployeeId, checkUserStatus, active, inactive } from '@/services/adminService';
import { Shield, CheckCircle, XCircle, KeyRound, Users } from 'lucide-react';

const ProfileSettingsPage = () => {
  const user = getUser();
  const userId = user?.id;
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activated, setActivated] = useState(!!user?.activated);
  const [permissions, setPermissions] = useState([]);
  const [dropdown, setDropdown] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      try {
        const status = await checkUserStatus(userId);
        if (typeof status === 'boolean') setActivated(status);
      } catch {}
      try { const p = await findAllPermissionsByEmployeeId(userId); setPermissions(Array.isArray(p) ? p : []); } catch {}
      try { const d = await findAllByEmployeeId(userId); setDropdown(Array.isArray(d) ? d : []); } catch {}
    };
    load();
  }, [userId]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!existingPassword || !newPassword || !confirmPassword) return toast.error('Fill all fields');
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
    try {
      await employeeChangePassword(userId, existingPassword, newPassword);
      toast.success('Password changed');
      setExistingPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (e) { toast.error('Change password failed'); }
  };

  const handleToggleActivation = async () => {
    try {
      if (activated) { await inactive(userId); setActivated(false); toast.success('Account deactivated'); }
      else { await active(userId); setActivated(true); toast.success('Account activated'); }
    } catch { toast.error('Operation failed'); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account, password, and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center"><Shield className="w-5 h-5 text-primary-foreground" /></div>
            <div>
              <div className="font-medium">{user?.userName}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
            <div className="ml-auto">
              <Badge className={activated ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                {activated ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
          <Button variant="outline" onClick={handleToggleActivation}>
            {activated ? <XCircle className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
            {activated ? 'Deactivate Account' : 'Activate Account'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Existing Password</Label>
              <Input type="password" value={existingPassword} onChange={(e) => setExistingPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="md:col-span-3">
              <Button type="submit" className="bg-gradient-primary"><KeyRound className="w-4 h-4 mr-2" /> Update Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Assigned Permissions</div>
            <div className="flex flex-wrap gap-2">
              {permissions.length ? permissions.map((p, i) => (
                <Badge key={i} variant="secondary" className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {String(p)}
                </Badge>
              )) : <div className="text-sm text-muted-foreground">No permissions</div>}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Dropdown Options</div>
            <div className="flex flex-wrap gap-2">
              {dropdown.length ? dropdown.map((p, i) => (
                <Badge key={i} variant="outline">{String(p)}</Badge>
              )) : <div className="text-sm text-muted-foreground">No options</div>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettingsPage;
