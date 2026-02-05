const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function login(payload) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}
