import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { Company } from '../../types/company';
import { Link } from '@tanstack/react-router';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflow: 'auto',
};

const SERVICE_CATEGORIES = ['BEAUTY', 'HEALTH', 'FITNESS', 'OTHER'];

interface CompanyTableProps {
  companies: Company[];
  onCompanyUpdate: (updatedCompany: Company) => void;
}

export const CompaniesTable = ({
  companies,
  onCompanyUpdate,
}: CompanyTableProps) => {
  const { control, handleSubmit, reset } = useForm();
  const [editingCompany, setEditingCompany] = useState(null);

  const handleEditClick = (company) => {
    setEditingCompany(company);
    reset(company);
  };

  const handleSaveChanges = (updatedCompany) => {
    onCompanyUpdate(updatedCompany);
    setEditingCompany(null);
  };

  const handleCancelEdit = () => {
    setEditingCompany(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          Companies Directory
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Company Info</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>
                  Working Hours
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Services</TableCell>
                <TableCell sx={{ width: 50 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => (
                <TableRow
                  key={company.id}
                  sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {company.logoUrl && (
                        <img
                          src={company.logoUrl}
                          alt={company.name}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {company.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {company.registrationCode}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {company.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {company.address}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {company.phoneNumber}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {company.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{company.category}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                      }}
                    >
                      {company.workingHours.map((hours, index) => (
                        <Typography key={index} variant="body2">
                          <strong>
                            {hours.dayOfWeek.charAt(0).toUpperCase() +
                              hours.dayOfWeek.slice(1, 3)}
                          </strong>
                          : {hours.openTime} - {hours.closeTime}
                        </Typography>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to="/company-details/$companyId"
                      params={{ companyId: company.id }}
                      variant="contained"
                      size="small"
                    >
                      Manage Services
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEditClick(company)}
                      sx={{ minWidth: 40 }}
                    >
                      <Edit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal open={!!editingCompany} onClose={handleCancelEdit}>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSaveChanges)}
          sx={modalStyle}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            Edit Company
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              mb: 3,
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              )}
            />
            <Controller
              name="registrationCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Registration Code"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              )}
            />
          </Box>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
            )}
          />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              mb: 3,
            }}
          >
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Address" fullWidth />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Phone" fullWidth />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Email" fullWidth />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Category"
                  fullWidth
                  margin="normal"
                >
                  {SERVICE_CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Working Hours
          </Typography>
          {editingCompany?.workingHours.map((hours, index) => (
            <Box
              key={index}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr 1fr',
                gap: 2,
                mb: 2,
                alignItems: 'center',
              }}
            >
              <Typography sx={{ minWidth: 100 }}>
                {hours.dayOfWeek.charAt(0).toUpperCase() +
                  hours.dayOfWeek.slice(1)}
                :
              </Typography>
              <Controller
                name={`workingHours.${index}.openTime`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Open Time"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }}
                  />
                )}
              />
              <Controller
                name={`workingHours.${index}.closeTime`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Close Time"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }}
                  />
                )}
              />
            </Box>
          ))}

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}
          >
            <Button onClick={handleCancelEdit} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
