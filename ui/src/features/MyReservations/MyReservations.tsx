import {
  Avatar,
  Box,
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
import { X } from 'lucide-react';
import { StyledTableCell } from '../../components/StyledTableCell/StyledTableCell';
import { getStatusColor } from '../../utils';

export const MyReservations = () => {
  const {
    data: reservations,
    isLoading: isReservationsLoading,
    updateReservation,
  } = useMyReservations();

  const handleCancelReservation = async (reservationId: number) => {
    await updateReservation({ reservationId, status: 'CANCELLED' });
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
                    {(reservation.status === 'CONFIRMED' ||
                      reservation.status === 'PENDING') && (
                      <X
                        onClick={() => handleCancelReservation(reservation.id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
