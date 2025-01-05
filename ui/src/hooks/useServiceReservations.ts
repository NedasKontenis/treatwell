import { useQuery } from '@tanstack/react-query';
import { ReservationMappedWithServiceAndUserResponse } from '../types/reservation';
import { api } from '../api/api';

export const useServiceReservations = (serviceId: number | undefined) => {
  const query = useQuery<ReservationMappedWithServiceAndUserResponse[]>({
    queryKey: ['service-reservations', serviceId],
    queryFn: async () => {
      const response = await api.get(`/reservations/service/${serviceId}`);
      return response.data;
    },
    enabled: !!serviceId,
  });

  const { data, isLoading } = query;

  return {
    data: data as ReservationMappedWithServiceAndUserResponse[],
    isLoading,
  };
};
