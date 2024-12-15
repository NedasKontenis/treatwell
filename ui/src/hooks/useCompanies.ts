import { useMutation } from '@tanstack/react-query';
import { api } from '../api/api';
import { CompanyForm } from '../routes/create-new-company.lazy';
import { useAuthStore } from '../stores/loginStore';

export const useCreateCompany = () => {
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (data: CompanyForm) => {
      return api.post('/companies', { ...data, ownerId: user.id });
    },
  });
};
