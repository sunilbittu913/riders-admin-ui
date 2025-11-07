import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { listUsers, active, inactive, employeeResetPassword, validate, validateUser, findUserByEmail, sendEmail } from '@/services/adminService';
import { Search, MoreHorizontal, CheckCircle, XCircle, RefreshCcw, UserCog, Mail, BadgeCheck } from 'lucide-react';

const AdminUsersPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  // Utility panel state
  const [userNameUtil, setUserNameUtil] = useState('');
  const [emailUtil, setEmailUtil] = useState('');
  const [validateResult, setValidateResult] = useState(null);
  const [validateUserResult, setValidateUserResult] = useState(null);
  const [lookupResult, setLookupResult] = useState(null);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / size)), [total, size]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { items, total: t } = await listUsers({ search, page, size });
      setRows(items || []);
      setTotal(t || 0);
    } catch (e) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page, size]);

  const handleActivate = async (user) => {
    try {
      await active(user.id);
      toast.success('User activated');
      fetchUsers();
    } catch { toast.error('Activate failed'); }
  };
  const handleDeactivate = async (user) => {
    try {
      await inactive(user.id);
      toast.success('User deactivated');
      fetchUsers();
    } catch { toast.error('Deactivate failed'); }
  };
  const handleResetPassword = async (user) => {
    try {
      await employeeResetPassword(user.id);
      toast.success('Password reset email sent');
    } catch { toast.error('Reset password failed'); }
  };

  // Utilities actions
  const handleValidate = async () => {
    if (!userNameUtil) return toast.error('Enter username');
    try { const res = await validate(userNameUtil); setValidateResult(res); toast.success('Validated'); }
    catch { toast.error('Validate failed'); }
  };
  const handleValidateUser = async () => {
    if (!userNameUtil) return toast.error('Enter username');
    try { const res = await validateUser(userNameUtil); setValidateUserResult(!!res); toast.success('Checked'); }
    catch { toast.error('ValidateUser failed'); }
  };
  const handleLookupByEmail = async () => {
    if (!emailUtil) return toast.error('Enter email');
    try { const res = await findUserByEmail(emailUtil); setLookupResult(res || null); if (res?.id) toast.success(`Found user #${res.id}`); else toast.message('No user found'); }
    catch { toast.error('Lookup failed'); }
  };
  const handleSendEmail = async () => {
    if (!userNameUtil) return toast.error('Enter username');
    try { await sendEmail(userNameUtil); toast.success('Email sent'); }
    catch { toast.error('Send email failed'); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Users</h1>
          <p className="text-muted-foreground mt-1">Manage platform users, status and passwords</p>
        </div>
        <Button className="bg-gradient-primary" onClick={fetchUsers} disabled={loading}>
          <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by username or email..." className="pl-10" value={search} onChange={(e) => { setPage(0); setSearch(e.target.value); }} />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page</span>
              <select className="bg-background border rounded px-2 py-1" value={size} onChange={(e) => { setPage(0); setSize(Number(e.target.value)); }}>
                {[10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Utilities */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Utilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm">Username</label>
              <Input value={userNameUtil} onChange={(e) => setUserNameUtil(e.target.value)} placeholder="Enter username" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleValidate}><BadgeCheck className="w-4 h-4 mr-1"/>Validate</Button>
                <Button variant="outline" size="sm" onClick={handleValidateUser}>ValidateUser</Button>
                <Button variant="secondary" size="sm" onClick={handleSendEmail}><Mail className="w-4 h-4 mr-1"/>Send Email</Button>
              </div>
              <div className="text-xs text-muted-foreground">
                {validateResult !== null && <div>validate: {String(validateResult)}</div>}
                {validateUserResult !== null && <div>validateUser: {String(validateUserResult)}</div>}
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm">Lookup by Email</label>
              <div className="flex gap-2">
                <Input value={emailUtil} onChange={(e) => setEmailUtil(e.target.value)} placeholder="user@example.com" />
                <Button variant="outline" onClick={handleLookupByEmail}>Lookup</Button>
              </div>
              {lookupResult && (
                <div className="text-sm mt-2 p-3 rounded border">
                  <div><strong>ID:</strong> {lookupResult.id ?? '—'}</div>
                  <div><strong>Username:</strong> {lookupResult.userName ?? '—'}</div>
                  <div><strong>Email:</strong> {lookupResult.email ?? '—'}</div>
                  <div><strong>Roles:</strong> {(lookupResult.roles || []).join(', ') || '—'}</div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users {loading && <span className="text-xs text-muted-foreground">Loading...</span>}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(u => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="font-medium">{u.userName}</div>
                      <div className="text-xs text-muted-foreground">ID: {u.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{u.email || '—'}</div>
                      <div className="text-xs text-muted-foreground">{u.mobile || '—'}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {(u.roles || []).map(r => <Badge key={r} variant="secondary">{r}</Badge>)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={u.activated ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                        {u.activated ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {u.activated ? (
                            <DropdownMenuItem onClick={() => handleDeactivate(u)} className="text-destructive">
                              <XCircle className="w-4 h-4 mr-2" /> Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleActivate(u)} className="text-success">
                              <CheckCircle className="w-4 h-4 mr-2" /> Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleResetPassword(u)}>
                            <UserCog className="w-4 h-4 mr-2" /> Reset Password
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="text-muted-foreground">
              Page {page + 1} of {totalPages} • {total} total
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => Math.max(0, p-1))}>Prev</Button>
              <Button variant="outline" size="sm" disabled={page + 1 >= totalPages} onClick={() => setPage(p => p+1)}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
