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

export async function fetchTrips(params = {}) {
  const response = await fetch(
    `${API_BASE_URL}/admin/trips${buildQuery(params)}`,
    { headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error("Unable to load trips");
  }

  return response.json();
}

export async function fetchAvailableTrips(params = {}) {
  const response = await fetch(
    `${API_BASE_URL}/trips${buildQuery(params)}`,
    { headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error("Unable to load available trips");
  }

  return response.json();
}

export async function fetchPublicTrips(params = {}) {
  const response = await fetch(
    `${API_BASE_URL}/public/trips${buildQuery(params)}`,
    { headers: { Accept: "application/json" } }
  );

  if (!response.ok) {
    throw new Error("Unable to load public trips");
  }

  return response.json();
}

export async function fetchTrip(id) {
  const response = await fetch(`${API_BASE_URL}/admin/trips/${id}`, {
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error("Unable to load trip");
  }

  return response.json();
}

export async function createTrip(payload) {
  const response = await fetch(`${API_BASE_URL}/admin/trips`, {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to create trip");
  }

  return response.json();
}

export async function updateTrip(id, payload) {
  const response = await fetch(`${API_BASE_URL}/admin/trips/${id}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to update trip");
  }

  return response.json();
}

export async function uploadTripMedia(tripId, file, { isCover = false } = {}) {
  const form = new FormData();
  form.append("image", file);
  if (isCover) {
    form.append("is_cover", "1");
  }

  const response = await fetch(`${API_BASE_URL}/admin/trips/${tripId}/media`, {
    method: "POST",
    headers: authHeaders(),
    body: form
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to upload image");
  }

  return response.json();
}

export async function fetchTripMedia(tripId) {
  const response = await fetch(`${API_BASE_URL}/admin/trips/${tripId}/media`, {
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error("Unable to load trip media");
  }

  return response.json();
}

export async function deleteTripMedia(tripId, mediaId) {
  const response = await fetch(
    `${API_BASE_URL}/admin/trips/${tripId}/media/${mediaId}`,
    {
      method: "DELETE",
      headers: authHeaders()
    }
  );

  if (!response.ok) {
    throw new Error("Unable to delete image");
  }

  return response.json();
}

export async function reorderTripMedia(tripId, mediaIds) {
  const response = await fetch(
    `${API_BASE_URL}/admin/trips/${tripId}/media/order`,
    {
      method: "PUT",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ media_ids: mediaIds })
    }
  );

  if (!response.ok) {
    throw new Error("Unable to reorder images");
  }

  return response.json();
}

export async function setTripCover(tripId, mediaId) {
  const response = await fetch(
    `${API_BASE_URL}/admin/trips/${tripId}/media/${mediaId}/cover`,
    {
      method: "PUT",
      headers: authHeaders()
    }
  );

  if (!response.ok) {
    throw new Error("Unable to set cover image");
  }

  return response.json();
}

export async function deleteTrip(id) {
  const response = await fetch(`${API_BASE_URL}/admin/trips/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error("Unable to archive trip");
  }

  return response.json();
}
