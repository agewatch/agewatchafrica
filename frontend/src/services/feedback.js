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

export async function fetchFeedback(page = 1) {
  const response = await fetch(`${API_BASE_URL}/feedback?page=${page}`, {
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error("Unable to load feedback");
  }

  return response.json();
}

export async function createFeedback(payload) {
  const response = await fetch(`${API_BASE_URL}/feedback`, {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to send feedback");
  }

  return response.json();
}

export async function fetchAdminFeedback(params = {}) {
  const response = await fetch(
    `${API_BASE_URL}/admin/feedback${buildQuery(params)}`,
    { headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error("Unable to load feedback");
  }

  return response.json();
}

export async function updateFeedback(id, payload) {
  const response = await fetch(`${API_BASE_URL}/admin/feedback/${id}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to update feedback");
  }

  return response.json();
}
