// routes/manage-companies.create-new.tsx
import { createLazyFileRoute } from '@tanstack/react-router'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useCreateCompany } from '../hooks/useCompanies'

export interface CompanyForm {
  name: string
  registrationCode: string
  description: string
  address: string
  phoneNumber: string
  email: string
}

export const Route = createLazyFileRoute('/create-new')({
  component: CreateCompany,
})

function CreateCompany() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyForm>()
  const createCompany = useCreateCompany()

  const onSubmit = async (data: CompanyForm) => {
    createCompany.mutate(data)
  }

  return (
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
  )
}
