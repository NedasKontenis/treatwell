import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  MenuItem,
} from '@mui/material';
import { useCreateCompany } from '../hooks/useCompanies';
import { useAuthStore } from '../stores/loginStore';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { companySchema, type CompanyFormData } from '../schemas/companySchema';

interface WorkingHours {
  dayOfWeek: string;
  openTime: string | null;
  closeTime: string | null;
}

const SERVICE_CATEGORIES = ['BEAUTY', 'HEALTH', 'FITNESS', 'OTHER'] as const;

export const Route = createLazyFileRoute('/create-new-company')({
  component: CreateCompany,
});

function CreateCompany() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
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
      category: 'BEAUTY',
    },
    mode: 'onBlur',
  });

  const createCompany = useCreateCompany();
  const { user } = useAuthStore();

  if (user?.role !== 'COMPANY_ADMIN') {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data: CompanyFormData) => {
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
    };

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

  const days: (keyof CompanyFormData['workingHours'])[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const validateWorkingHours = (closeTime: Date | null, day: string) => {
    const openTime = watch(`workingHours.${day}.open`);
    if (openTime && closeTime) {
      return closeTime > openTime || 'Close time must be after open time';
    }
    return true;
  };

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
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={4}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={createCompany.isPending}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
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
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Category"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={createCompany.isPending}
              >
                {SERVICE_CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="logoUrl"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Logo URL (Optional)"
                margin="normal"
                placeholder="https://example.com/logo.png"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
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
                  render={({ field, fieldState }) => (
                    <TimePicker
                      {...field}
                      label="Open Time"
                      ampm={false}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          margin: 'normal',
                          disabled: createCompany.isPending,
                          error:
                            !!errors.workingHours?.[day]?.open ||
                            !!errors.workingHours?.[day]?.message,
                          helperText:
                            errors.workingHours?.[day]?.open?.message ||
                            errors.workingHours?.[day]?.message,
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
                  rules={{
                    validate: (value) => validateWorkingHours(value, day),
                  }}
                  render={({ field, fieldState }) => (
                    <TimePicker
                      {...field}
                      label="Close Time"
                      ampm={false}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          margin: 'normal',
                          disabled: createCompany.isPending,
                          error: !!fieldState.error,
                          helperText: fieldState.error?.message,
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
            disabled={createCompany.isPending || isSubmitting}
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
