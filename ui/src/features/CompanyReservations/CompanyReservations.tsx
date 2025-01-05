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
import { FC, useEffect, useState } from 'react';
import { Company } from '../../types/company';
import { ServiceDTO, useServices } from '../../hooks/useServices';
import { SelectedServiceReservations } from '../../components/SelectedServiceReservations/SelectedServiceReservations';

interface CompanyReservationsProps {
  companies: Company[];
}

export const CompanyReservations: FC<CompanyReservationsProps> = ({
  companies,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<number>(
    companies[0].id
  );
  const { services, isLoading: isServicesLoading } = useServices(
    selectedCompany.toString()
  );
  const [selectedService, setSelectedService] = useState<ServiceDTO | null>();

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
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedService && (
              <SelectedServiceReservations selectedService={selectedService} />
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};
