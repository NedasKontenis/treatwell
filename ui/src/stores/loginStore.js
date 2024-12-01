import { create } from 'zustand';
import { PRS_AUTH_TOKEN } from '../constants/constants.js';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (userData, token) => {
    localStorage.setItem(PRS_AUTH_TOKEN, token);
    set({
      user: userData,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem(PRS_AUTH_TOKEN);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  initAuth: () => {
    const token = localStorage.getItem(PRS_AUTH_TOKEN);
    if (token) {
      // TODO: need to revalidate the token with fresh data here on init
      set({ token, isAuthenticated: true });
    }
  },
}));
