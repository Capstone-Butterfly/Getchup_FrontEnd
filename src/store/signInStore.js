import { create } from "zustand";

const signInStore = create((set) => ({
  email: '',
  password: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}));

export default signInStore;