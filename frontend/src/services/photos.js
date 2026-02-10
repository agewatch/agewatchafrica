import { getToken } from "./auth.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function authHeaders() {
  const token = getToken();
  const headers = { Accept: "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
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

export async function fetchPhotos(page = 1) {
  const response = await fetch(`${API_BASE_URL}/community/photos?page=${page}`, {
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error("Unable to load photos");
  }

  return response.json();
}

export async function fetchPublicPhotos(page = 1) {
  const response = await fetch(`${API_BASE_URL}/public/photos?page=${page}`, {
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error("Unable to load photos");
  }

  return response.json();
}

export async function createPhoto(payload) {
  const headers = authHeaders();
  let body = null;

  if (payload instanceof FormData) {
    body = payload;
  } else if (payload?.file) {
    const formData = new FormData();
    formData.append("image", payload.file);
    if (payload.title) {
      formData.append("title", payload.title);
    }
    if (payload.caption) {
      formData.append("caption", payload.caption);
    }
    body = formData;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE_URL}/community/photos`, {
    method: "POST",
    headers,
    body
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to submit photo");
  }

  return response.json();
}

export async function fetchAdminPhotos(params = {}) {
  const response = await fetch(
    `${API_BASE_URL}/admin/photos${buildQuery(params)}`,
    { headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error("Unable to load photos");
  }

  return response.json();
}

export async function updatePhoto(id, payload) {
  const response = await fetch(`${API_BASE_URL}/admin/photos/${id}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to update photo");
  }

  return response.json();
}
