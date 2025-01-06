import {
  Avatar,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useMyReservations } from '../../hooks/useMyReservations';
import { StyledTableCell } from '../../components/StyledTableCell/StyledTableCell';
import { getStatusColor } from '../../utils';
import ClearIcon from '@mui/icons-material/Clear';
import { StarIcon } from 'lucide-react';
import { ReservationMappedWithServiceResponse } from '../../types/reservation';
import { useState } from 'react';
import { RatingModal } from '../../components/ServiceRatingModal/ServiceRatingModal';
import { useServiceRating } from '../../hooks/useServiceRating';

export const MyReservations = () => {
  const {
    data: reservations,
    isLoading: isReservationsLoading,
    updateReservation,
  } = useMyReservations();
  const { rateService, updateService } = useServiceRating();

  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationMappedWithServiceResponse>();

  const handleCancelReservation = async (reservationId: number) => {
    await updateReservation({ reservationId, status: 'CANCELLED' });
  };

  const handleRateService = (
    reservation: ReservationMappedWithServiceResponse
  ) => {
    setSelectedReservation(reservation);
    setIsRatingModalOpen(true);
  };

  const handleRatingSubmit = async (
    rating: number,
    comment: string,
    isExisting: boolean
  ) => {
    if (!selectedReservation) {
      return;
    }

    if (isExisting) {
      await updateService({
        reservationId: selectedReservation.id,
        serviceId: selectedReservation.serviceId,
        rating,
        comment,
      });
      return;
    }

    await rateService({
      reservationId: selectedReservation.id,
      userId: selectedReservation.userId,
      serviceId: selectedReservation.serviceId,
      rating,
      comment,
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          My Reservations
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <StyledTableCell>Service</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Rate</StyledTableCell>
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations?.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={
                          reservation.serviceImageUrl || '/fallback-image.png'
                        }
                        alt={reservation.serviceName}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Typography variant="body2">
                        {reservation.serviceName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>€{reservation.totalPrice}</TableCell>
                  <TableCell>{reservation.dateTime}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: getStatusColor(reservation.status),
                        color: 'white',
                        py: 0.5,
                        px: 1,
                        borderRadius: 1,
                        display: 'inline-block',
                      }}
                    >
                      {reservation.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleRateService(reservation)}
                      disabled={reservation.status !== 'COMPLETED'}
                      sx={{ minWidth: 40 }}
                    >
                      <StarIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleCancelReservation(reservation.id)}
                      disabled={
                        reservation.status !== 'CONFIRMED' &&
                        reservation.status !== 'PENDING'
                      }
                      sx={{ minWidth: 40 }}
                    >
                      <ClearIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {selectedReservation && (
        <RatingModal
          open={isRatingModalOpen}
          onClose={() => {
            setIsRatingModalOpen(false);
            setSelectedReservation(null);
          }}
          onSubmit={handleRatingSubmit}
          reservation={selectedReservation}
        />
      )}
    </Box>
  );
};
