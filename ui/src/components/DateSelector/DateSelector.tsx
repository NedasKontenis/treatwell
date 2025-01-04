import { format, addMonths } from 'date-fns';
import { IconButton, Box, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateSelectorProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function DateSelector({
  selectedDate,
  onDateSelect,
}: DateSelectorProps) {
  const today = new Date();
  const maxDate = addMonths(today, 1);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const currentWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(selectedDate);
    const currentDay = date.getDay();
    const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;
    date.setDate(date.getDate() - daysFromMonday + i);
    return date;
  });

  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    if (newDate >= today) {
      onDateSelect(newDate);
    }
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    if (newDate <= maxDate) {
      onDateSelect(newDate);
    }
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <IconButton onClick={handlePrevWeek}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6">
          {format(selectedDate, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={handleNextWeek}>
          <ChevronRight />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentWeek.map((date) => (
          <Box
            key={date.toString()}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              opacity: date < today || date > maxDate ? 0.5 : 1,
              pointerEvents: date < today || date > maxDate ? 'none' : 'auto',
              '&:hover': { bgcolor: 'action.hover' },
              p: 1,
              borderRadius: 1,
              bgcolor:
                date.getDate() === selectedDate.getDate()
                  ? 'primary.main'
                  : 'transparent',
              color:
                date.getDate() === selectedDate.getDate()
                  ? 'primary.contrastText'
                  : 'inherit',
            }}
            onClick={() => onDateSelect(date)}
          >
            <Typography variant="caption">
              {daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1]}
            </Typography>
            <Typography>{date.getDate()}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
