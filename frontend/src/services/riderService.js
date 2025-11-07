import api from '@/lib/apiClient';

function normalizeListResponse(resp) {
  const payload = resp?.data?.data ?? resp?.data;
  if (!payload) return { items: [], total: 0, page: 0, size: 0 };
  if (Array.isArray(payload)) return { items: payload, total: payload.length, page: 0, size: payload.length };
  if (Array.isArray(payload.content)) {
    return {
      items: payload.content,
      total: payload.totalElements ?? payload.content.length,
      page: payload.number ?? 0,
      size: payload.size ?? payload.content.length,
    };
  }
  return { items: [], total: 0, page: 0, size: 0 };
}

export async function listRiders({ search = '', page = 0, size = 10 } = {}) {
  const params = { page, size };
  if (search) params.search = search;
  const resp = await api.get('/riders/list', { params });
  return normalizeListResponse(resp);
}

export async function getRider(id) {
  const resp = await api.get(`/riders/${id}`);
  return resp?.data?.data ?? resp?.data;
}

export async function createRider(dto) {
  const resp = await api.post('/riders', dto);
  return resp?.data?.data ?? resp?.data;
}

export async function updateRider(id, dto) {
  const resp = await api.put(`/riders/${id}`, dto);
  return resp?.data?.data ?? resp?.data;
}

export async function deleteRider(id) {
  const resp = await api.delete(`/riders/${id}`);
  return resp?.data?.data ?? resp?.data;
}

export async function suspendRider(id) {
  const resp = await api.delete(`/riders/inactive/${id}`);
  return resp?.data?.data ?? resp?.data;
}

export async function activateRider(id) {
  const resp = await api.delete(`/riders/active/${id}`);
  return resp?.data?.data ?? resp?.data;
}
