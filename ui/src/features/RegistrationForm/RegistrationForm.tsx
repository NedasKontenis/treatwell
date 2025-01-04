import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PasswordRequirements } from './components/PasswordRequirements';
import { useRegister } from '../../hooks/useRegister';

const PASSWORD_RULES = {
  minLength: 8,
  patterns: {
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
  },
};

export const RegisterForm = () => {
  const [showError, setShowError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const register = useRegister();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '+370',
    },
  });

  const password = watch('password');

  const validatePassword = (value) => {
    if (value.length < PASSWORD_RULES.minLength) {
      return `Password must be at least ${PASSWORD_RULES.minLength} characters`;
    }
    if (!PASSWORD_RULES.patterns.hasUpperCase.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!PASSWORD_RULES.patterns.hasLowerCase.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!PASSWORD_RULES.patterns.hasNumber.test(value)) {
      return 'Password must contain at least one number';
    }
    if (!PASSWORD_RULES.patterns.hasSpecialChar.test(value)) {
      return 'Password must contain at least one special character';
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      setShowError('');
      await register.mutateAsync(data);
      setShowSuccessMessage(true);
    } catch (error) {
      if (error.response?.status === 400) {
        setShowError(
          error.response.data.message || 'Validation error occurred'
        );
      } else if (error.response?.status === 409) {
        setShowError('Email already exists');
      } else {
        setShowError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!showSuccessMessage ? (
          <>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            {showError && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {showError}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...registerField('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              <Box sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...registerField('password', {
                    required: 'Password is required',
                    validate: validatePassword,
                  })}
                />
                <PasswordRequirements password={watch('password') || ''} />
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                {...registerField('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                {...registerField('firstName', {
                  required: 'First name is required',
                  pattern: {
                    value: /^[A-Za-z\s-]+$/,
                    message:
                      'First name can only contain letters, spaces, and hyphens',
                  },
                })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                {...registerField('lastName', {
                  required: 'Last name is required',
                  pattern: {
                    value: /^[A-Za-z\s-]+$/,
                    message:
                      'Last name can only contain letters, spaces, and hyphens',
                  },
                })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                {...registerField('phoneNumber', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\+370\d{8}$/,
                    message:
                      'Phone number must be in format: +370 followed by 8 digits',
                  },
                  onChange: (e) => {
                    let value = e.target.value;
                    if (!value.startsWith('+370')) {
                      value = '+370';
                    }
                    value =
                      value.slice(0, 4) + value.slice(4).replace(/\D/g, '');
                    value = value.slice(0, 12);
                    setValue('phoneNumber', value);
                  },
                })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={register.isPending}
              >
                {register.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Register'
                )}
              </Button>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'success.main',
              mt: 2,
            }}
          >
            <CheckCircleIcon sx={{ mr: 1 }} />
            <Typography variant="body1">Registration Successful!</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};
