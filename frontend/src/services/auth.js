const TOKEN_KEY = "awa_token";
const USER_KEY = "awa_user";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setStoredUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function isAuthenticated() {
  return !!getToken();
}

export async function login({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  if (data?.token) {
    setToken(data.token);
  }

  if (data?.user) {
    setStoredUser(data.user);
  }

  return data;
}

export async function register({ name, email, password, passwordConfirmation }) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    })
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  const data = await response.json();

  if (data?.token) {
    setToken(data.token);
  }

  if (data?.user) {
    setStoredUser(data.user);
  }

  return data;
}

export async function fetchMe() {
  const token = getToken();
  if (!token) return null;

  const response = await fetch(`${API_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
  });

  if (!response.ok) return null;
  const data = await response.json();
  if (data) setStoredUser(data);
  return data;
}

export async function sendVerificationEmail() {
  const token = getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(
    `${API_BASE_URL}/email/verification-notification`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    }
  );

  if (!response.ok) {
    throw new Error("Unable to send verification email");
  }

  return response.json();
}

export function logout() {
  clearToken();
}
