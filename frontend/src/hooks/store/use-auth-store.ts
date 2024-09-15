import { create } from "zustand";

interface User {
  fullName: string;
  username: string;
  role: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  // setUser: (token: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const savedUser = JSON.parse(localStorage.getItem("user") || "null");

  console.log("Loaded User from localStorage:", savedUser); // Log untuk memeriksa user dari localStorage

  return {
    user: savedUser,
    setUser: (user) => {
      set({ user });
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ user: null });
    },
  };
});
