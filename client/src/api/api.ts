import type { RegisterFormData } from "../pages/sign-up/sign-up.tsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => localStorage.getItem("token");

const withAuthHeaders = (headers: HeadersInit = {}) => ({
  ...headers,
  Authorization: `Bearer ${getToken()}`,
});

export const api = {
  getUsers: async (params: {
    sorted?: string;
    ascending?: boolean;
    filter?: string;
  }) => {
    const query = new URLSearchParams({
      sorted: params.sorted || "created",
      ascending: String(params.ascending ?? true),
      filter: params.filter || "",
    });

    const res = await fetch(`${BASE_URL}/api/users?${query.toString()}`, {
      headers: withAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch users");
    }

    return data;
  },

  updateUserStatus: async (userIds: number[], active: boolean) => {
    const res = await fetch(`${BASE_URL}/api/users/status`, {
      method: "PATCH",
      headers: withAuthHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        users: userIds.map((id) => ({ id })),
        active,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to update user status");
    }

    return data;
  },

  deleteUsers: async (userIds: number[]) => {
    const res = await fetch(`${BASE_URL}/api/users/delete`, {
      method: "DELETE",
      headers: withAuthHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        users: userIds.map((id) => ({ id })),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to delete users");
    }

    return data;
  },

  signUp: async (formData: RegisterFormData) => {
    const res = await fetch(`${BASE_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Registration failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("currentUser", data.email);
  },

  signIn: async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/api/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("currentUser", data.email);
  },

  signOut: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  },
};
