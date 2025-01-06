import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { StyledTableCell } from '../../components/StyledTableCell/StyledTableCell';
import React, { FC, useEffect, useState } from 'react';
import { Company } from '../../types/company';
import { ServiceDTO, useServices } from '../../hooks/useServices';
import { SelectedServiceReservations } from '../../components/SelectedServiceReservations/SelectedServiceReservations';
import { StatusModal } from '../../components/StatusModal/StatusModal';
import { ReservationMappedWithServiceAndUserResponse } from '../../types/reservation';
import { useReservation } from '../../hooks/useMutateReservation';
import { useMailer } from '../../hooks/useMailer';

interface CompanyReservationsProps {
  companies: Company[];
}

export const CompanyReservations: FC<CompanyReservationsProps> = ({
  companies,
}) => {
  const mailer = useMailer();
  const [selectedCompany, setSelectedCompany] = useState<number>(
    companies[0].id
  );
  const { services, isLoading: isServicesLoading } = useServices(
    selectedCompany.toString()
  );
  const { updateReservationStatus } = useReservation();
  const [selectedService, setSelectedService] = useState<ServiceDTO | null>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationMappedWithServiceAndUserResponse>();

  useEffect(() => {
    if (services?.[0]) {
      setSelectedService(services[0]);
      return;
    }

    setSelectedService(null);
  }, [selectedCompany, services]);

  if (isServicesLoading || !services) {
    return <h2>Loading...</h2>;
  }
  const handleCompanyChange = (id: number) => {
    setSelectedCompany(id);
  };

  const handleServiceChange = (id: number) => {
    const foundService = services.find((service) => service.id === id);

    setSelectedService(foundService);
  };

  const handleStatusChange = async (status: string) => {
    if (!selectedReservation?.id) {
      return;
    }

    try {
      await updateReservationStatus({
        serviceId: selectedReservation.id,
        status,
      });
    } catch (e) {
      console.error(e);
    }

    if (status === 'CANCELLED') {
      await mailer.mutateAsync({
        title: '[PRS] Your reservation has been cancelled by service provider',
        message:
          'Unfortunately, the service provider decided to cancel your reservationSincerely',
      });
      return;
    }

    if (status === 'CONFIRMED') {
      await mailer.mutateAsync({
        title: '[PRS] Your reservation has been confirmed by service provider',
        message: `Your reservation for ${selectedReservation.serviceName} has been confirmed by the provider!<br><br>Your reserved time ${selectedReservation.dateTime}`,
      });
      return;
    }

    await mailer.mutateAsync({
      title: '[PRS] Your reservation was marked completed',
      message: `Your reservation status for ${selectedReservation.serviceName} has been marked as completed by the service provider.`,
    });
  };

  const handleModalOpen = (
    reservation: ReservationMappedWithServiceAndUserResponse
  ) => {
    setSelectedReservation(reservation);
    setModalOpen(true);
  };

  const getAvailableStatuses = () => {
    if (!selectedReservation) {
      return;
    }

    const allStatuses = {
      confirmed: { key: 'CONFIRMED', label: 'Confirm' },
      cancelled: { key: 'CANCELLED', label: 'Cancel' },
      completed: { key: 'COMPLETED', label: 'Complete' },
    };

    if (selectedReservation.status === 'CONFIRMED') {
      return [allStatuses.cancelled, allStatuses.completed];
    }

    return [allStatuses.confirmed, allStatuses.cancelled];
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ maxWidth: '400px', paddingY: 2, display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Company</InputLabel>
          <Select
            label="Company"
            value={selectedCompany || companies[0].id}
            onChange={({ target }) =>
              handleCompanyChange(target.value as number)
            }
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Service</InputLabel>
          <Select
            label="Service"
            value={selectedService?.id || services[0]?.id}
            onChange={({ target }) =>
              handleServiceChange(target.value as number)
            }
          >
            {services.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          Company Reservations
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Client details</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedService && (
              <SelectedServiceReservations
                selectedService={selectedService}
                openModal={handleModalOpen}
              />
            )}
          </TableBody>
        </Table>
        <StatusModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedReservation(null);
          }}
          onSave={handleStatusChange}
          statuses={getAvailableStatuses()}
        />
      </Paper>
    </Box>
  );
};
