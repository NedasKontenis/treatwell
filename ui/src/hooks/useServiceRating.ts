import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';

interface ServiceRating {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  serviceId: number;
  userId: number;
  reservationId: number;
}

export const useServiceRating = () => {
  const queryClient = useQueryClient();

  const useServiceRatingByReservation = (
    serviceId: number,
    reservationId: number
  ) => {
    const query = useQuery({
      queryKey: ['service-rating-by-reservation', serviceId, reservationId],
      queryFn: async () => {
        const response = await api.get(
          `/services/${serviceId}/ratings/reservation/${reservationId}`
        );
        return response.data;
      },
    });

    const { data, isLoading } = query;

    return {
      serviceRatingByReservation: data as ServiceRating,
      isLoading,
    };
  };

  const rateService = useMutation({
    mutationFn: async ({
      reservationId,
      serviceId,
      userId,
      rating,
      comment,
    }) => {
      await api.post(`/services/${serviceId}/ratings`, {
        reservationId,
        serviceId,
        userId,
        rating,
        comment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['services'],
      });
    },
  });

  const updateService = useMutation({
    mutationFn: async ({ reservationId, serviceId, rating, comment }) => {
      await api.put(`/services/${serviceId}/ratings/${reservationId}`, {
        rating,
        comment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['service-rating-by-reservation'],
      });
      queryClient.invalidateQueries({
        queryKey: ['services'],
      });
    },
  });

  return {
    rateService: rateService.mutateAsync,
    getServiceRatingByReservation: useServiceRatingByReservation,
    updateService: updateService.mutateAsync,
  };
};
