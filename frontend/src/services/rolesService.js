import api from '@/lib/apiClient';

// Helpers to normalize paginated responses from backend
function normalizePage(resp) {
  if (!resp) return { items: [], total: 0 };
  if (Array.isArray(resp)) return { items: resp, total: resp.length };
  const d = resp.data ?? resp;
  // Support various wrappers {content,totalElements} or {items,total}
  if (Array.isArray(d?.content)) return { items: d.content, total: d.totalElements ?? d.total ?? d.content.length };
  if (Array.isArray(d?.items)) return { items: d.items, total: d.total ?? d.items.length };
  return { items: Array.isArray(d) ? d : [], total: Array.isArray(d) ? d.length : 0 };
}

export async function listRoles({ search = '', page = 0, size = 10 } = {}) {
  const params = { page, size };
  const url = search ? '/roles/filtered-list' : '/roles/list';
  if (search) params.search = search;
  const { data } = await api.get(url, { params });
  return normalizePage(data);
}

export async function listRolesByCompany(companyId, { page = 0, size = 10 } = {}) {
  const { data } = await api.get(`/roles/list/${companyId}`, { params: { page, size } });
  return normalizePage(data);
}

export async function dropdownList() {
  const { data } = await api.get('/roles/dropdownList');
  return data?.data ?? data;
}

export async function getRole(id) {
  const { data } = await api.get(`/roles/${id}`);
  return data?.data ?? data;
}

export async function createRole(payload) {
  const { data } = await api.post('/roles', payload);
  return data?.data ?? data;
}

export async function updateRole(id, payload) {
  const { data } = await api.put(`/roles/${id}`, payload);
  return data?.data ?? data;
}

export async function deleteRole(id) {
  const { data } = await api.delete(`/roles/${id}`);
  return data?.data ?? data;
}
