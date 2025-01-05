import {
  Avatar,
  Box,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { ServiceDTO } from '../../hooks/useServices';
import { FC } from 'react';
import { useServiceReservations } from '../../hooks/useServiceReservations';
import { getStatusColor } from '../../utils';

interface SelectedServiceReservationsProps {
  selectedService: ServiceDTO;
}

export const SelectedServiceReservations: FC<
  SelectedServiceReservationsProps
> = ({ selectedService }) => {
  const { data, isLoading } = useServiceReservations(selectedService?.id);

  if (isLoading || !data) {
    return <h2>Service reservation details are loading...</h2>;
  }

  return data.map((reservation) => (
    <TableRow key={reservation.id}>
      <TableCell>{reservation.dateTime}</TableCell>
      <TableCell>€{reservation.totalPrice}</TableCell>
      <TableCell>
        <Stack>
          <Typography>
            {reservation.userLastName}, {reservation.userFirstName}
          </Typography>
          <Typography>{reservation.userEmail}</Typography>
          <Typography>{reservation.userPhoneNumber}</Typography>
        </Stack>
      </TableCell>
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
    </TableRow>
  ));
};
