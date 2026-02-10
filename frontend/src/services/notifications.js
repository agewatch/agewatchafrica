import { getToken } from "./auth.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function authHeaders() {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  };
}

export async function fetchAdminUnreadCount() {
  const response = await fetch(
    `${API_BASE_URL}/admin/notifications/unread-count`,
    { headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error("Unable to load notifications");
  }

  return response.json();
}

export async function fetchAdminNotifications(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });
  const queryString = query.toString();
  const response = await fetch(
    `${API_BASE_URL}/admin/notifications${queryString ? `?${queryString}` : ""}`,
    { headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error("Unable to load notifications");
  }

  return response.json();
}

export async function markAdminNotificationRead(id) {
  const response = await fetch(
    `${API_BASE_URL}/admin/notifications/${id}/read`,
    { method: "PUT", headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error("Unable to update notification");
  }

  return response.json();
}

export async function markAllAdminNotificationsRead() {
  const response = await fetch(
    `${API_BASE_URL}/admin/notifications/read-all`,
    { method: "PUT", headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error("Unable to update notifications");
  }

  return response.json();
}
