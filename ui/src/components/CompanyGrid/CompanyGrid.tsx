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
} from '@mui/material';
import { MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Company } from '../../types/company';
import { SearchCompanies } from '../../features/SearchCompanies/SearchCompanies';

export const CompanyGrid = ({ companies }: Company[]) => {
  const [filteredCompanies, setFilteredCompanies] =
    useState<Company[]>(companies);

  return (
    <Box sx={{ p: 3 }}>
      <SearchCompanies
        allCompanies={companies}
        updateFilteredCompanies={setFilteredCompanies}
      />
      <Grid container spacing={3}>
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
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
                  image={company.logoUrl || 'src/assets/NoImagePlaceholder.svg'}
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

                  <Chip label={company.category} size="small" sx={{ mb: 2 }} />

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
          ))
        ) : (
          <Box sx={{ p: 3 }}>
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
