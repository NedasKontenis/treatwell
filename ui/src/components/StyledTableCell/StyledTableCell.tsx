import { ReactNode } from '@tanstack/react-router';
import { TableCell } from '@mui/material';

export const StyledTableCell = ({
  children,
  width,
}: {
  children?: ReactNode;
  width?: number;
}) => {
  return (
    <TableCell sx={{ fontWeight: 'bold', width: `${width ? width : 'auto'}` }}>
      {children}
    </TableCell>
  );
};
