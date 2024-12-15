import { Box, Typography } from '@mui/material';
import { getRequirementLabel, passwordChecks } from '../utils.ts';

export const PasswordRequirements = ({ password }) => {
  const checks = passwordChecks(password);

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Password requirements:
      </Typography>
      {Object.entries(checks).map(([key, valid]) => (
        <Typography
          key={key}
          variant="body2"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: valid ? 'success.main' : 'text.secondary',
          }}
        >
          {valid ? '✓' : '○'} {getRequirementLabel(key)}
        </Typography>
      ))}
    </Box>
  );
};
