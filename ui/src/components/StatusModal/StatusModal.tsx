import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { FC, useState } from 'react';

interface StatusModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (status: string) => void;
  statuses?: { key: string; label: string }[];
}

export const StatusModal: FC<StatusModalProps> = ({
  open,
  onClose,
  onSave,
  statuses = [
    { key: 'CONFIRMED', label: 'Confirm' },
    { key: 'CANCELLED', label: 'Cancel' },
  ],
}) => {
  const [selectedStatus, setSelectedStatus] = useState<{
    key: string;
    label: string;
  }>();

  const handleSave = () => {
    selectedStatus && onSave(selectedStatus.key);
    onClose();
    setSelectedStatus(null);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 300,
          borderRadius: 1,
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus?.key || ''}
            onChange={(e) => {
              const newStatus = statuses.find(
                ({ key }) => key === e.target.value
              ) as { key: string; label: string };

              setSelectedStatus(newStatus);
            }}
            label="Status"
          >
            {statuses.map((status) => (
              <MenuItem key={status.key} value={status.key}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3, justifyContent: 'flex-end' }}
        >
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!selectedStatus}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
