import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { ReactNode } from '@tanstack/react-router';

interface StyledTableProps {
  title: string;
  tableHeaderCells: ReactNode;
  tableBodyContent: ReactNode;
}

export const StyledTable: FC<StyledTableProps> = ({
  title,
  tableHeaderCells,
  tableBodyContent,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          {title}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: 'action.hover' }}>
              <TableRow>{tableHeaderCells}</TableRow>
            </TableHead>
            <TableBody>{tableBodyContent}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
