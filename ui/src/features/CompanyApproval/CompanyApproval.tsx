import { useCompanies, useCompanyStatusUpdate } from '../../hooks/useCompanies';
import { StyledTable } from '../../components/StyledTable/StyledTable';
import { StyledTableCell } from '../../components/StyledTableCell/StyledTableCell';
import {
  Avatar,
  Box,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Company } from '../../types/company';
import { DeclineModal } from '../../components/DeclineModal/DeclineModal';
import { useMailer } from '../../hooks/useMailer';

export const CompanyApproval = ({ companies }: { companies: Company[] }) => {
  const updateCompanyStatus = useCompanyStatusUpdate();
  const mailer = useMailer();
  const [filteredCompanies, setFilteredCompanies] =
    useState<Company[]>(companies);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleApprove = async (id: number, companyName: string) => {
    await updateCompanyStatus.mutateAsync({ id, isApproved: true });

    await mailer.mutateAsync({
      title: `[PRS] Your submitted company (${companyName}) status update`,
      message: `We are happy to announce, that Your submitted "${companyName}" was approved! :)`,
    });

    const updatedCompanies = filteredCompanies.filter(
      (company) => company.id !== id
    );
    setFilteredCompanies(updatedCompanies);
  };

  const handleDecline = async (company: Company, message: string) => {
    await updateCompanyStatus.mutateAsync({
      id: company.id,
      isApproved: false,
    });

    await mailer.mutateAsync({
      title: `[PRS] Your submitted company (${company.name}) status update`,
      message,
    });
    const updatedCompanies = filteredCompanies.filter(
      ({ id }) => company.id !== id
    );
    setFilteredCompanies(updatedCompanies);
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const openDeclineModal = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  return (
    <>
      <StyledTable
        title="Approve Companies"
        tableHeaderCells={
          <>
            <StyledTableCell>Company Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Registration Code</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Contact</StyledTableCell>
            <StyledTableCell>Approve</StyledTableCell>
            <StyledTableCell>Decline</StyledTableCell>
          </>
        }
        tableBodyContent={
          <>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={company.logoUrl || '/fallback-image.png'}
                      alt={company.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography variant="body2">{company.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{company.description}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {company.registrationCode}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2">{company.category}</Typography>
                </TableCell>
                <TableCell>
                  <Stack>
                    <Typography variant="body2" sx={{ color: 'info.dark' }}>
                      {company.email}
                    </Typography>
                    <Typography variant="body2">{company.address}</Typography>
                    <Typography variant="body2">
                      {company.phoneNumber}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Plus
                    onClick={() => handleApprove(company.id, company.name)}
                    style={{ cursor: 'pointer' }}
                  />
                </TableCell>
                <TableCell>
                  <X
                    onClick={() => openDeclineModal(company)}
                    style={{ cursor: 'pointer' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
      <DeclineModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCompany(null);
        }}
        onConfirm={(message) => {
          if (selectedCompany) {
            handleDecline(selectedCompany, message);
          }
        }}
        companyName={selectedCompany?.name || ''}
      />
    </>
  );
};
