import { useAuthStore } from '../stores/loginStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { ReservationMappedWithServiceResponse } from '../types/reservation';

export const useMyReservations = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const reservationsQuery = useQuery<ReservationMappedWithServiceResponse[]>({
    queryKey: ['my-reservations', user?.id],
    queryFn: async () => {
      const response = await api.get(`/reservations/user/${user?.id}`);
      return response.data;
    },
    enabled: user?.id && user?.role === 'USER',
  });

  const { data, isLoading } = reservationsQuery;

  const updateReservation = useMutation({
    mutationFn: ({ reservationId, status }) =>
      api.put(`/reservations/${reservationId}?status=${status}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-reservations', user?.id],
      });
    },
  });

  return {
    data: data as ReservationMappedWithServiceResponse[],
    isLoading,
    updateReservation: updateReservation.mutateAsync,
  };
};
