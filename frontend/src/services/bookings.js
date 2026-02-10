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

export async function fetchBookings(params = {}) {
  const response = await fetch(
    `${API_BASE_URL}/admin/bookings${buildQuery(params)}`,
    {
    headers: authHeaders()
    }
  );

  if (!response.ok) {
    throw new Error("Unable to load bookings");
  }

  return response.json();
}

export async function fetchUserBookings(page = 1) {
  const response = await fetch(`${API_BASE_URL}/bookings?page=${page}`, {
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error("Unable to load your bookings");
  }

  return response.json();
}

export async function createBooking(payload) {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to create booking");
  }

  return response.json();
}

export async function updateBooking(id, payload) {
  const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to update booking");
  }

  return response.json();
}
