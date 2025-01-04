import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { ServiceFormData } from '../features/ServiceManagement/ServiceManagement';

export type ServiceDTO = {
  id?: number;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: string;
  companyId: number;
  isActive: boolean;
  imageUrl?: string;
};

export const useServices = (companyId: string) => {
  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ['services', companyId],
    queryFn: async () => {
      const { data } = await api.get<ServiceDTO[]>(
        `/services/company/${companyId}`
      );
      return data;
    },
  });

  const createServiceMutation = useMutation({
    mutationFn: (newService) => api.post<ServiceDTO>('/services', newService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', companyId] });
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: (updatedService) =>
      api.put<ServiceDTO>(`/services/${updatedService.id}`, updatedService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', companyId] });
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: (serviceId) => api.delete(`/services/${serviceId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', companyId] });
    },
  });

  return {
    services: services as ServiceDTO[],
    isLoading,
    createService: createServiceMutation.mutateAsync,
    updateService: updateServiceMutation.mutateAsync,
    deleteService: deleteServiceMutation.mutateAsync,
  };
};
