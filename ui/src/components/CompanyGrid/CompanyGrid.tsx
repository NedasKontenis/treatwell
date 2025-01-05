import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Chip,
  Pagination,
  Stack,
} from '@mui/material';
import { MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Company } from '../../types/company';
import { SearchCompanies } from '../../features/SearchCompanies/SearchCompanies';
import { ITEMS_PER_PAGE } from '../../constants/constants';

export const CompanyGrid = ({ companies }: Company[]) => {
  const [filteredCompanies, setFilteredCompanies] =
    useState<Company[]>(companies);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilteredCompaniesUpdate = (companies: Company[]) => {
    setFilteredCompanies(companies);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <SearchCompanies
        allCompanies={companies}
        updateFilteredCompanies={handleFilteredCompaniesUpdate}
      />
      <Grid container spacing={3}>
        {filteredCompanies.length > 0 ? (
          <>
            {currentCompanies.map((company) => (
              <Grid item xs={12} sm={6} md={4} key={company.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      company.logoUrl || 'src/assets/NoImagePlaceholder.svg'
                    }
                    alt={company.name}
                    sx={{ objectFit: 'cover' }}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {company.name}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <MapPin size={16} />
                      <Typography variant="body2" color="text.secondary">
                        {company.address}
                      </Typography>
                    </Box>

                    <Chip
                      label={company.category}
                      size="small"
                      sx={{ mb: 2 }}
                    />

                    <Box sx={{ mt: 'auto' }}>
                      <Button
                        component={Link}
                        to="/provider/$companyId"
                        params={{ companyId: company.id }}
                        variant="contained"
                        size="small"
                        fullWidth
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {totalPages > 1 && (
              <Grid item xs={12}>
                <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                  <Typography variant="body2" color="text.secondary">
                    Showing {indexOfFirstItem + 1}-
                    {Math.min(indexOfLastItem, filteredCompanies.length)} of{' '}
                    {filteredCompanies.length} companies
                  </Typography>
                </Stack>
              </Grid>
            )}
          </>
        ) : (
          <Box sx={{ p: 3, width: '100%' }}>
            <Typography variant="h6" color="text.primary">
              No search results found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search or filter to find what you're looking
              for
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};
