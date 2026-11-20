import { API_URL } from "./config";
import type { User, AuthResponse, LoginCredentials } from "../types";

const TOKEN_KEY = "practika_token";
const USER_KEY = "practika_user";

function createToken(userId: string | number): string {
  const payload = `${userId}:${Date.now()}`;
  return btoa(payload);
}

function saveSession(user: User): AuthResponse {
  const token = createToken(user.id);
  const { password: _, ...safeUser } = user;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(safeUser));

  return { token, user: safeUser };
}

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const response = await fetch(
    `${API_URL}/users?email=${encodeURIComponent(credentials.email)}`
  );

  if (!response.ok) {
    throw new Error("Ошибка при обращении к серверу. Запущен ли json-server?");
  }

  const users: User[] = await response.json();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === credentials.email.toLowerCase() &&
      u.password === credentials.password
  );

  if (!user) {
    throw new Error("Неверный email или пароль");
  }

  return saveSession(user);
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  // Проверяем, нет ли уже такого email
  const checkRes = await fetch(
    `${API_URL}/users?email=${encodeURIComponent(data.email)}`
  );
  if (!checkRes.ok) {
    throw new Error("Ошибка при обращении к серверу");
  }

  const existing: User[] = await checkRes.json();
  if (existing.length > 0) {
    throw new Error("Пользователь с таким email уже зарегистрирован");
  }

  if (data.password.length < 6) {
    throw new Error("Пароль должен быть не короче 6 символов");
  }

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      role: "user",
    }),
  });

  if (!response.ok) {
    throw new Error("Не удалось зарегистрироваться. Попробуйте позже.");
  }

  const newUser: User = await response.json();
  return saveSession(newUser);
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): Omit<User, "password"> | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getToken() && !!getStoredUser();
}