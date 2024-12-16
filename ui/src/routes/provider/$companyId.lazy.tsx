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
import { Clock, MapPin } from 'lucide-react';
import { useServices } from '../../hooks/useServices';
import { useState } from 'react';
import { useAvailableSlots } from '../../hooks/useAvailableSlots';
import { format } from 'date-fns';
import { DateSelector } from '../../components/DateSelector/DateSelector';

export const Route = createLazyFileRoute('/provider/$companyId')({
  component: PublicCompanyDetails,
});

function PublicCompanyDetails() {
  const { companyId } = Route.useParams();
  const { data: company, isLoading: isLoadingCompany } = useCompany(companyId);
  const { services, isLoading: isLoadingServices } = useServices(companyId);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: availableSlots, isLoading: isLoadingSlots } = useAvailableSlots(
    selectedService?.id,
    selectedDate
  );

  if (isLoadingCompany || isLoadingServices) {
    return <div>Loading...</div>;
  }

  if (!company || !services) {
    return <div>Company not found</div>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      {/* Company Header */}
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
        {/* Working Hours & Contact */}
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

        {/* Services Section */}
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

            {/* Available Slots */}
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
                          onClick={() => {
                            // Handle reservation
                          }}
                        >
                          {new Date(slot).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography color="text.secondary">
                    No available times for today
                  </Typography>
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
