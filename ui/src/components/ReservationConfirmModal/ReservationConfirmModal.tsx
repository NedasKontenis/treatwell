import { Modal, Box, Typography, Button } from '@mui/material';
import { format } from 'date-fns';

interface ReservationConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  service: any;
  selectedTime: Date;
  isLoading: boolean;
}

export function ReservationConfirmModal({
  open,
  onClose,
  onConfirm,
  service,
  selectedTime,
  isLoading,
}: ReservationConfirmModalProps) {
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
          Confirm Reservation
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>
            <strong>Service:</strong> {service.name}
          </Typography>
          <Typography gutterBottom>
            <strong>Date:</strong> {format(selectedTime, 'MMMM d, yyyy')}
          </Typography>
          <Typography gutterBottom>
            <strong>Time:</strong> {format(selectedTime, 'HH:mm')}
          </Typography>
          <Typography gutterBottom>
            <strong>Duration:</strong> {service.durationMinutes} minutes
          </Typography>
          <Typography gutterBottom>
            <strong>Price:</strong> €{service.price.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained" disabled={isLoading}>
            {isLoading ? 'Confirming...' : 'Confirm Reservation'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
