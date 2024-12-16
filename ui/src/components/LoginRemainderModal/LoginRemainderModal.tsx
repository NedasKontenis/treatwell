import { Modal, Box, Typography, Button } from '@mui/material';
import { Link } from '@tanstack/react-router';

interface LoginReminderModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginReminderModal({ open, onClose }: LoginReminderModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Login Required
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Please log in or sign up to make a reservation.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="secondary"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
