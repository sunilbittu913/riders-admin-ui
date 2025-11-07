import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { listRoles, createRole, updateRole, deleteRole } from '@/services/rolesService';
import { Search, Plus, Pencil, Trash2, RefreshCcw } from 'lucide-react';

const emptyForm = { roleName: '', roleDescription: '', rolePermissions: '' };

const RolesPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / size)), [total, size]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { items, total: t } = await listRoles({ search, page, size });
      setRows(items || []);
      setTotal(t || 0);
    } catch (e) { toast.error('Failed to load roles'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [search, page, size]);

  const onNew = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const onEdit = (r) => {
    setEditing(r);
    setForm({
      roleName: r.roleName ?? '',
      roleDescription: r.roleDescription ?? '',
      rolePermissions: r.rolePermissions ?? (Array.isArray(r.permissions) ? r.permissions.join(',') : ''),
    });
    setOpen(true);
  };

  const onDelete = async (r) => {
    if (!window.confirm(`Delete role "${r.roleName}"?`)) return;
    try { await deleteRole(r.id ?? r.roleId); toast.success('Deleted'); fetchData(); }
    catch { toast.error('Delete failed'); }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    try {
      if (editing) await updateRole(editing.id ?? editing.roleId, payload);
      else await createRole(payload);
      toast.success(editing ? 'Updated' : 'Created');
      setOpen(false);
      fetchData();
    } catch { toast.error('Save failed'); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Roles</h1>
          <p className="text-muted-foreground mt-1">Manage roles and permissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchData} disabled={loading}><RefreshCcw className="w-4 h-4 mr-2"/>Refresh</Button>
          <Button className="bg-gradient-primary" onClick={onNew}><Plus className="w-4 h-4 mr-2"/>New Role</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search roles..." className="pl-10" value={search} onChange={(e) => { setPage(0); setSearch(e.target.value); }} />
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

      <Card>
        <CardHeader>
          <CardTitle>Roles {loading && <span className="text-xs text-muted-foreground">Loading...</span>}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(r => (
                  <TableRow key={r.id ?? r.roleId}>
                    <TableCell className="font-medium">{r.roleName}</TableCell>
                    <TableCell>{r.roleDescription}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {Array.isArray(r.permissions) && r.permissions.length
                          ? r.permissions.map(p => <Badge key={p} variant="secondary">{p}</Badge>)
                          : (r.rolePermissions || '—')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(r)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => onDelete(r)}><Trash2 className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="text-muted-foreground">Page {page + 1} of {totalPages} • {total} total</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => Math.max(0, p-1))}>Prev</Button>
              <Button variant="outline" size="sm" disabled={page + 1 >= totalPages} onClick={() => setPage(p => p+1)}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Role' : 'New Role'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Role Name</Label>
              <Input value={form.roleName} onChange={(e) => setForm(f => ({...f, roleName: e.target.value}))} required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={form.roleDescription} onChange={(e) => setForm(f => ({...f, roleDescription: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Permissions (comma separated)</Label>
              <Input value={form.rolePermissions} onChange={(e) => setForm(f => ({...f, rolePermissions: e.target.value}))} placeholder="read,write,delete" />
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

export default RolesPage;
