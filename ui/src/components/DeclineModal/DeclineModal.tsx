import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useState } from 'react';

interface DeclineModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
  companyName: string;
}

export const DeclineModal = ({
  open,
  onClose,
  onConfirm,
  companyName,
}: DeclineModalProps) => {
  const [message, setMessage] = useState('');

  const handleConfirm = () => {
    onConfirm(message);
    setMessage('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Decline Company Registration</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={`Message for ${companyName}`}
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Decline Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};
