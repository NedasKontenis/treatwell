import { create } from 'zustand';
import { ENDPOINT, PRS_AUTH_TOKEN } from '../constants/constants.js';
import { api } from '../api/api';

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

  initAuth: async () => {
    const token = localStorage.getItem(PRS_AUTH_TOKEN);

    if (token) {
      try {
        const response = await api.get(ENDPOINT.TOKEN_AUTH);
        set({
          user: response.data,
          isAuthenticated: true,
        });
      } catch (error) {
        localStorage.removeItem(PRS_AUTH_TOKEN);
        set({
          user: null,
          isAuthenticated: false,
        });
      }
    }
  },
}));
