import { useAuthStore } from '../stores/loginStore';
import { useMutation } from '@tanstack/react-query';
import { api } from '../api/api';
import { ENDPOINT } from '../constants/constants';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const { data } = await api.post(ENDPOINT.REGISTER, userData);
      return data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      setRegistrationSuccess(true);
    },
  });

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(false);
    router.navigate({ to: '/' });
  };

  return {
    ...mutation,
    registrationSuccess,
    handleRegistrationSuccess,
  };
};
