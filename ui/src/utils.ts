export const getStatusColor = (
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING' | 'COMPLETED'
) => {
  if (status === 'CANCELLED') {
    return 'error.light';
  }

  if (status === 'PENDING') {
    return 'orange';
  }

  if (status === 'CONFIRMED') {
    return 'info.light';
  }

  return 'success.light';
};
