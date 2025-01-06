import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Paper,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useServices } from '../../hooks/useServices';

export type ServiceFormData = {
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  isActive: boolean;
  imageUrl?: string;
};

export const ServicesManagement = ({ companyId }: string) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const { control, handleSubmit, reset } = useForm<ServiceFormData>();

  const { services, createService, updateService } = useServices(companyId);

  const handleAddService = () => {
    setEditingService(null);
    reset({
      name: '',
      description: '',
      price: 0,
      durationMinutes: 30,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    reset(service);
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: ServiceFormData) => {
    try {
      if (editingService) {
        await updateService({
          ...data,
          companyId,
        } as any);
      } else {
        await createService({
          ...data,
          companyId,
        } as any);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddService}
        >
          Add New Service
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services?.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {service.imageUrl && (
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                    )}
                    <Typography>{service.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{service.durationMinutes} min</TableCell>
                <TableCell>€{service.price.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEditService(service)}
                    size="small"
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {!services?.length && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary" py={3}>
                    No services available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingService ? 'Edit Service' : 'Add New Service'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Service Name"
                  fullWidth
                  margin="normal"
                  required
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  type="number"
                  fullWidth
                  margin="normal"
                  required
                />
              )}
            />
            <Controller
              name="durationMinutes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Duration (minutes)"
                  type="number"
                  fullWidth
                  margin="normal"
                  required
                />
              )}
            />
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image URL"
                  fullWidth
                  margin="normal"
                  placeholder="https://example.com/image.jpg"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
