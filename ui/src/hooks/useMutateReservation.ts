import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';

export const useReservation = () => {
  const queryClient = useQueryClient();

  const updateReservationStatus = useMutation({
    mutationFn: ({ serviceId, status }) =>
      api.put(`/reservations/${serviceId}?status=${status}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['service-reservations'],
      });
    },
  });

  return {
    updateReservationStatus: updateReservationStatus.mutateAsync,
  };
};
