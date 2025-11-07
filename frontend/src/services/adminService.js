import api from '@/lib/apiClient';

function unwrap(resp) {
  return resp?.data?.data ?? resp?.data;
}

function normalizePage(resp) {
  const payload = unwrap(resp);
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

// Users CRUD
export async function createUser(dto) {
  const resp = await api.post('/api/admin', dto);
  return unwrap(resp);
}

export async function updateUser(id, dto) {
  const resp = await api.put(`/api/admin/${id}`, dto);
  return unwrap(resp);
}

export async function deleteUser(id) {
  const resp = await api.delete(`/api/admin/${id}`);
  return unwrap(resp);
}

export async function deleteUserWithTransfer(id, newOwnerId, body = '') {
  const params = {};
  if (newOwnerId != null) params.newOwnerId = newOwnerId;
  const resp = await api.post(`/api/admin/${id}`, body, { params });
  return unwrap(resp);
}

// Listing
export async function listUsers({ search = '', page = 0, size = 10 } = {}) {
  const params = { page, size };
  if (search) params.search = search;
  try {
    const resp = await api.get('/api/admin/list', { params });
    return normalizePage(resp);
  } catch (e) {
    // Fallback: if backend list is failing, support search via user-by-email
    if (search) {
      try {
        const one = await findUserByEmail(search);
        const items = one ? [one] : [];
        return { items, total: items.length, page: 0, size: items.length };
      } catch (_) { /* ignore */ }
    }
    return { items: [], total: 0, page: 0, size: 0 };
  }
}

export async function listAllUsers({ search = '', page = 0, size = 10 } = {}) {
  const params = { page, size };
  if (search) params.search = search;
  try {
    const resp = await api.get('/api/admin/list-all', { params });
    return normalizePage(resp);
  } catch (e) {
    if (search) {
      try {
        const one = await findUserByEmail(search);
        const items = one ? [one] : [];
        return { items, total: items.length, page: 0, size: items.length };
      } catch (_) { /* ignore */ }
    }
    return { items: [], total: 0, page: 0, size: 0 };
  }
}

// Validation / status
export async function validate(userName) {
  const resp = await api.get('/api/admin/validate', { params: { userName } });
  return unwrap(resp);
}

export async function validateUser(userName) {
  const resp = await api.get('/api/admin/validateUser', { params: { userName } });
  return resp?.data ?? false;
}

export async function findUserByEmail(email) {
  const resp = await api.get('/api/admin/user-by-email', { params: { email } });
  return unwrap(resp);
}

export async function sendEmail(userName) {
  // Try username param first; fallback to email param if looks like an email
  try {
    const resp = await api.get('/api/admin/sendEmail', { params: { userName } });
    return unwrap(resp);
  } catch (e) {
    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userName)) {
      const resp2 = await api.get('/api/admin/sendEmail', { params: { email: userName } });
      return unwrap(resp2);
    }
    throw e;
  }
}

export async function employeeResetPassword(id) {
  const resp = await api.get(`/api/admin/user_reset_password/${id}`);
  return unwrap(resp);
}

export async function employeeChangePassword(id, existingPassword, newPassword) {
  const resp = await api.get(`/api/admin/user_change_password/${id}`, { params: { existingPassword, newPassword } });
  return unwrap(resp);
}

export async function employeeCurrentPasswordCheck(id, password) {
  const resp = await api.get(`/api/admin/check_existing_password/${id}`, { params: { password } });
  return unwrap(resp);
}

export async function checkUserStatus(id) {
  const resp = await api.get(`/api/admin/check-user-status/${id}`);
  return unwrap(resp);
}

export async function inactive(id) {
  const resp = await api.delete(`/api/admin/inactive/${id}`);
  return unwrap(resp);
}

export async function active(id) {
  const resp = await api.delete(`/api/admin/active/${id}`);
  return unwrap(resp);
}

// Permissions
export async function findAllPermissionsByEmployeeId(employeeId) {
  const resp = await api.get('/api/admin/employeepermissionsfordisplay', { params: { employeeId } });
  return unwrap(resp);
}

export async function findAllByEmployeeId(employeeId) {
  const resp = await api.get('/api/admin/dropdownList', { params: { employeeId } });
  return unwrap(resp);
}
