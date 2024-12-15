import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { useCreateCompany } from '../hooks/useCompanies';
import { useAuthStore } from '../stores/loginStore';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

interface WorkingHours {
  dayOfWeek: string;
  openTime: string | null;
  closeTime: string | null;
}

export interface CompanyForm {
  name: string;
  registrationCode: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
  logoUrl?: string;
  workingHours: {
    monday: { open: Date | null; close: Date | null };
    tuesday: { open: Date | null; close: Date | null };
    wednesday: { open: Date | null; close: Date | null };
    thursday: { open: Date | null; close: Date | null };
    friday: { open: Date | null; close: Date | null };
    saturday: { open: Date | null; close: Date | null };
    sunday: { open: Date | null; close: Date | null };
  };
}

export const Route = createLazyFileRoute('/create-new-company')({
  component: CreateCompany,
});

function CreateCompany() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyForm>({
    defaultValues: {
      workingHours: {
        monday: { open: null, close: null },
        tuesday: { open: null, close: null },
        wednesday: { open: null, close: null },
        thursday: { open: null, close: null },
        friday: { open: null, close: null },
        saturday: { open: null, close: null },
        sunday: { open: null, close: null },
      },
    },
  });
  const createCompany = useCreateCompany();

  const { user } = useAuthStore();

  if (user?.role !== 'COMPANY_ADMIN') {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data: CompanyForm) => {
    const workingHoursList: WorkingHours[] = Object.entries(
      data.workingHours
    ).map(([day, { open, close }]) => ({
      dayOfWeek: day,
      openTime: open ? formatTime(open) : null,
      closeTime: close ? formatTime(close) : null,
    }));

    const payload = {
      ...data,
      workingHours: workingHoursList,
    } as CompanyForm;

    createCompany.mutate(payload);
  };

  const formatTime = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const days: (keyof CompanyForm['workingHours'])[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Register New Company
        </Typography>

        {createCompany.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {createCompany.error?.message || 'Failed to create company'}
          </Alert>
        )}

        {createCompany.isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Company successfully created!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Company name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Company Name"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={createCompany.isPending}
              />
            )}
          />

          <Controller
            name="registrationCode"
            control={control}
            rules={{ required: 'Registration code is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Registration Code"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={createCompany.isPending}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={4}
                disabled={createCompany.isPending}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{ required: 'Address is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Address"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={createCompany.isPending}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: 'Phone number is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone Number"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={createCompany.isPending}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={createCompany.isPending}
              />
            )}
          />

          <Controller
            name="logoUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Logo URL (Optional)"
                margin="normal"
                placeholder="https://example.com/logo.png"
                disabled={createCompany.isPending}
              />
            )}
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Working Hours
          </Typography>

          {days.map((day) => (
            <Grid container spacing={2} key={day} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" textTransform="capitalize">
                  {day}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`workingHours.${day}.open`}
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      label="Open Time"
                      ampm={false}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          margin: 'normal',
                          disabled: createCompany.isPending,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`workingHours.${day}.close`}
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      label="Close Time"
                      ampm={false}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          margin: 'normal',
                          disabled: createCompany.isPending,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={createCompany.isPending}
          >
            {createCompany.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register Company'
            )}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
