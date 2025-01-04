import { useAuthStore } from '../stores/loginStore';
import { useMutation } from '@tanstack/react-query';
import { api } from '../api/api';
import { ENDPOINT } from '../constants/constants';
import { useRouter } from '@tanstack/react-router';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await api.post(ENDPOINT.LOGIN, credentials);
      return data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      router.navigate({ to: '/' });
    },
  });
};
