import api, { tokenStore } from '@/lib/apiClient';

const USER_KEY = 'auth_user';
const userStore = {
  get: () => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; }
  },
  set: (u) => localStorage.setItem(USER_KEY, JSON.stringify(u || null)),
  clear: () => localStorage.removeItem(USER_KEY),
};

// POST /api/admin/login -> AppUserVO
export async function login({ userName, password }) {
  const { data } = await api.post('/api/admin/login', { userName, password });
  if (data?.token) tokenStore.set(data.token);
  if (data) userStore.set(data);
  return data;
}

export function logout() {
  tokenStore.clear();
  userStore.clear();
}

export function getToken() {
  return tokenStore.get();
}

export function getUser() {
  return userStore.get();
}

export function setUser(u) {
  userStore.set(u);
}
