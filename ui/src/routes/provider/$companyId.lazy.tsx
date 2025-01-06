import { createLazyFileRoute } from '@tanstack/react-router';
import { useCompany } from '../../hooks/useCompanies';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Clock, MapPin, Star } from 'lucide-react';
import { ServiceDTO, useServices } from '../../hooks/useServices';
import { useState } from 'react';
import { useAvailableSlots } from '../../hooks/useAvailableSlots';
import { format } from 'date-fns';
import { DateSelector } from '../../components/DateSelector/DateSelector';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/loginStore';
import { api } from '../../api/api';
import { LoginReminderModal } from '../../components/LoginRemainderModal/LoginRemainderModal';
import { ReservationConfirmModal } from '../../components/ReservationConfirmModal/ReservationConfirmModal';

export const Route = createLazyFileRoute('/provider/$companyId')({
  component: PublicCompanyDetails,
});

function PublicCompanyDetails() {
  const { companyId } = Route.useParams();
  const { data: company, isLoading: isLoadingCompany } = useCompany(companyId);
  const { services, isLoading: isLoadingServices } = useServices(companyId);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const [selectedService, setSelectedService] = useState<ServiceDTO>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { data: availableSlots, isLoading: isLoadingSlots } = useAvailableSlots(
    selectedService?.id,
    selectedDate
  );

  const createReservation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/reservations', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['availableSlots'],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-reservations'],
      });
    },
  });

  if (isLoadingCompany || isLoadingServices) {
    return <div>Loading...</div>;
  }

  if (!company || !services) {
    return <div>Company not found</div>;
  }

  const handleTimeClick = (time) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setSelectedTime(time);
    setShowConfirmModal(true);
  };

  const handleConfirmReservation = async () => {
    if (!selectedTime || !selectedService || !user) return;

    const localDateTime =
      new Date(selectedTime)
        .toLocaleString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        .replace(', ', 'T') + '.000';

    try {
      await createReservation.mutateAsync({
        serviceId: selectedService.id,
        userId: user.id,
        dateTime: localDateTime,
        totalPrice: selectedService.price,
      } as any);
      setShowConfirmModal(false);
      // You might want to add a success notification here
    } catch (error) {
      // You might want to add an error notification here
      console.error('Failed to create reservation:', error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ position: 'relative' }}>
          {company.logoUrl && (
            <Box
              component="img"
              src={company.logoUrl}
              alt={company.name}
              sx={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
          )}
        </Box>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            {company.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <MapPin size={20} />
            <Typography>{company.address}</Typography>
          </Box>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {company.description}
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Working Hours
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {company.workingHours.map((hours, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {hours.dayOfWeek}:
                  </Typography>
                  <Typography>
                    {hours.openTime
                      ? `${hours.openTime} - ${hours.closeTime}`
                      : 'Closed'}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography>Phone: {company.phoneNumber}</Typography>
              <Typography>Email: {company.email}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Available Services
            </Typography>
            <Grid container spacing={2}>
              {services?.map((service) => (
                <Grid item xs={12} key={service.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: 2,
                        transform: 'translateY(-2px)',
                      },
                      bgcolor:
                        selectedService?.id === service.id
                          ? 'action.selected'
                          : 'inherit',
                    }}
                    onClick={() => setSelectedService(service)}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Box>
                          <Typography variant="h6">{service.name}</Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {service.description}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Clock size={16} />
                            <Typography variant="body2">
                              {service.durationMinutes} minutes
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Star size={16} />
                            <Typography variant="body2">
                              <strong>{service.averageRating ?? 0}</strong> (
                              {service.totalRatings ?? 0})
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" color="primary" gutterBottom>
                            €{service.price.toFixed(2)}
                          </Typography>
                          <Button
                            variant={
                              selectedService?.id === service.id
                                ? 'outlined'
                                : 'contained'
                            }
                            size="small"
                          >
                            {selectedService?.id === service.id
                              ? 'Selected'
                              : 'Select'}
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {selectedService && (
              <Box sx={{ mt: 3 }}>
                <DateSelector
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />

                <Typography variant="h6" gutterBottom>
                  Available Times for {format(selectedDate, 'EEEE, MMMM d')}
                </Typography>

                {isLoadingSlots ? (
                  <Typography>Loading available times...</Typography>
                ) : availableSlots?.length ? (
                  <Grid container spacing={1}>
                    {availableSlots.map((slot) => (
                      <Grid item key={slot}>
                        <Button
                          variant="outlined"
                          onClick={() => handleTimeClick(new Date(slot))}
                        >
                          {format(new Date(slot), 'HH:mm')}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography color="text.secondary">
                    No available times for this day
                  </Typography>
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <LoginReminderModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {selectedService && selectedTime && (
        <ReservationConfirmModal
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmReservation}
          service={selectedService}
          selectedTime={selectedTime}
          isLoading={createReservation.isPending}
        />
      )}
    </Box>
  );
}
