import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import { format } from 'date-fns';

export const useAvailableSlots = (
  serviceId: number | undefined,
  date: Date
) => {
  const query = useQuery({
    queryKey: ['availableSlots', serviceId, format(date, 'yyyy-MM-dd')],
    queryFn: async () => {
      const { data } = await api.get(
        `/services/${serviceId}/available-slots?date=${format(date, 'yyyy-MM-dd')}`
      );
      return data;
    },
    enabled: !!serviceId,
  });

  const { data, isLoading } = query;

  return {
    data,
    isLoading,
  };
};
