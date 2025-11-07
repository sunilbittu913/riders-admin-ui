import api from '@/lib/apiClient';

function normalizeListResponse(resp) {
  // Response wrapper: { status, httpStatus, message, data }
  const payload = resp?.data?.data ?? resp?.data;
  if (!payload) return { items: [], total: 0, page: 0, size: 0 };

  if (Array.isArray(payload)) {
    return { items: payload, total: payload.length, page: 0, size: payload.length };
  }

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

export async function listDrivers({ search = '', page = 0, size = 10 } = {}) {
  const params = { page, size };
  if (search) params.search = search;
  const resp = await api.get('/drivers/list', { params });
  return normalizeListResponse(resp);
}

export async function getDriver(id) {
  const resp = await api.get(`/drivers/${id}`);
  return resp?.data?.data ?? resp?.data;
}

export async function createDriver(dto) {
  const resp = await api.post('/drivers', dto);
  return resp?.data?.data ?? resp?.data;
}

export async function updateDriver(id, dto) {
  const resp = await api.put(`/drivers/${id}`, dto);
  return resp?.data?.data ?? resp?.data;
}

export async function deleteDriver(id) {
  const resp = await api.delete(`/drivers/${id}`);
  return resp?.data?.data ?? resp?.data;
}
