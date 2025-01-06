import React, { FC, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Star as StarIcon } from 'lucide-react';
import { ReservationMappedWithServiceResponse } from '../../types/reservation';
import { useServiceRating } from '../../hooks/useServiceRating';

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string, isExisting: boolean) => void;
  reservation: ReservationMappedWithServiceResponse;
}

export const RatingModal: FC<RatingModalProps> = ({
  open,
  onClose,
  onSubmit,
  reservation,
}) => {
  const { getServiceRatingByReservation } = useServiceRating();
  const { serviceRatingByReservation, isLoading } =
    getServiceRatingByReservation(reservation.serviceId, reservation.id);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (serviceRatingByReservation?.rating) {
      setRating(serviceRatingByReservation.rating);
      setComment(serviceRatingByReservation?.comment || '');
    }
  }, [serviceRatingByReservation]);

  const handleSubmit = () => {
    if (!rating) {
      setError('Please select a rating');
      return;
    }

    const isExisting = !!serviceRatingByReservation?.rating;

    onSubmit(rating, comment, isExisting);
    handleClose();
  };

  const handleClose = () => {
    setRating(null);
    setComment('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Rate Service - {reservation.serviceName}</DialogTitle>
      {!isLoading ? (
        <>
          <DialogContent>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}
            >
              <Box>
                <Typography component="legend" gutterBottom>
                  Rating*
                </Typography>
                <Rating
                  value={rating}
                  onChange={(_, newValue) => {
                    setRating(newValue);
                    setError('');
                  }}
                  icon={<StarIcon />}
                  emptyIcon={<StarIcon />}
                />
                {error && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {error}
                  </Alert>
                )}
              </Box>
              <TextField
                label="Comment (optional)"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {!serviceRatingByReservation ? 'Submit Rating' : 'Update Rating'}
            </Button>
          </DialogActions>
        </>
      ) : (
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
};
