import api, { tokenStore } from '@/lib/apiClient';

// POST /api/admin/login -> AppUserVO
export async function login({ userName, password }) {
  const { data } = await api.post('/api/admin/login', { userName, password });
  if (data?.token) tokenStore.set(data.token);
  return data;
}

export function logout() {
  tokenStore.clear();
}

export function getToken() {
  return tokenStore.get();
}
