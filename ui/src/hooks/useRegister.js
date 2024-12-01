import { useAuthStore } from '../stores/loginStore.js';
import { useMutation } from '@tanstack/react-query';
import { api } from '../api/api.js';
import { ENDPOINT } from '../constants/constants.js';

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await api.post(ENDPOINT.REGISTER, userData);
      return data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
};
