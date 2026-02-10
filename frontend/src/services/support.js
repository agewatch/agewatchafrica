import { getToken } from "./auth.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function authHeaders() {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  };
}

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

export async function fetchSupportMessages(page = 1) {
  const response = await fetch(
    `${API_BASE_URL}/support/messages?page=${page}`,
    { headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error("Unable to load support messages");
  }

  return response.json();
}

export async function createSupportMessage(payload) {
  const response = await fetch(`${API_BASE_URL}/support/messages`, {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to send support message");
  }

  return response.json();
}

export async function fetchAdminSupportMessages(params = {}) {
  const response = await fetch(
    `${API_BASE_URL}/admin/support/messages${buildQuery(params)}`,
    { headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error("Unable to load support messages");
  }

  return response.json();
}

export async function updateSupportMessage(id, payload) {
  const response = await fetch(
    `${API_BASE_URL}/admin/support/messages/${id}`,
    {
      method: "PUT",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to update support message");
  }

  return response.json();
}
