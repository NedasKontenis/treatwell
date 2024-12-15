import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import { CompanyForm } from '../routes/create-new-company.lazy';
import { useAuthStore } from '../stores/loginStore';
import { Company } from '../types/company';
import { ENDPOINT } from '../constants/constants';

export const useCreateCompany = () => {
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (data: CompanyForm) => {
      return api.post(ENDPOINT.COMPANIES, { ...data, ownerId: user.id });
    },
  });
};

export const useCompaniesByOwner = () => {
  const { user } = useAuthStore();

  const query = useQuery<Company[]>({
    queryKey: ['companies', user?.id],
    queryFn: async () => {
      const response = await api.get(`/companies/owner/${user?.id}`);
      return response.data;
    },
    enabled: user?.id && user?.role === 'COMPANY_ADMIN',
  });

  const { data, isLoading } = query;

  return {
    data: data as Company[],
    isLoading,
  };
};

export const useCompany = (companyId: string) => {
  const query = useQuery<Company>({
    queryKey: ['company', companyId],
    queryFn: async () => {
      const { data } = await api.get(`/companies/${companyId}`);
      return data;
    },
  });

  const { data, isLoading } = query;

  return {
    data: data as Company,
    isLoading,
  };
};
