import { createLazyFileRoute } from '@tanstack/react-router';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useCompany } from '../../hooks/useCompanies';
import { ServicesManagement } from '../../features/ServiceManagement/ServiceManagement';

export const Route = createLazyFileRoute('/company-details/$companyId')({
  component: CompanyDetails,
});

function CompanyDetails() {
  const { companyId } = Route.useParams();
  const { data: company, isLoading } = useCompany(companyId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: '24px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%',
        }}
      >
        <Accordion defaultExpanded={false} sx={{ width: '100%', mb: 3 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              '& .MuiAccordionSummary-content': {
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            <Typography variant="h4" gutterBottom>
              {company.name}
            </Typography>
            <Typography color="text.secondary">
              Registration Code: {company.registrationCode}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ minWidth: 80 }}>Email:</Typography>
                    <Typography>{company.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ minWidth: 80 }}>Phone:</Typography>
                    <Typography>{company.phoneNumber}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ minWidth: 80 }}>Address:</Typography>
                    <Typography>{company.address}</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Working Hours
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {company.workingHours.map((hours, index) => (
                    <Box key={index} sx={{ display: 'flex' }}>
                      <Typography sx={{ minWidth: 120 }}>
                        {hours.dayOfWeek.charAt(0).toUpperCase() +
                          hours.dayOfWeek.slice(1)}
                        :
                      </Typography>
                      <Typography>
                        {hours.openTime
                          ? `${hours.openTime} - ${hours.closeTime}`
                          : '-'}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>

            {company.description && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                  {company.description}
                </Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>

        <Typography variant="h5" gutterBottom>
          Services
        </Typography>

        <Paper sx={{ width: '100%' }}>
          {/*<Box sx={{ p: 3 }}>*/}
          {/*  <Typography color="text.secondary">*/}
          {/*    Services management will be implemented here.*/}
          {/*  </Typography>*/}
          {/*</Box>*/}
          <ServicesManagement companyId={companyId} />
        </Paper>
      </Box>
    </Box>
  );
}
