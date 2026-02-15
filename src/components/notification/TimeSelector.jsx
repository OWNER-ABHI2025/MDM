import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { useNotification } from '../../contexts/NotifcationContext'
import dayjs from 'dayjs'
import { useEffect } from 'react'

const TimeSelector = () => {
  const { selectedTime, setSelectedTime } = useNotification()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={selectedTime}
        onChange={newValue => setSelectedTime(newValue)}
        minTime={dayjs()}
        slotProps={{
          textField: {
            sx: {
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { border: 'none' }, // Border color
                '&:hover fieldset': { border: 'none' }, // Hover state
                '&.Mui-focused fieldset': { border: 'none' }, // Focus state
              },
              '& .MuiInputAdornment-root svg': {
                color: 'white', // Change clock icon color to white
              },
              '& .MuiInputBase-input': {
                fontSize: 'medium',
              },
              input: { color: 'white' }, // Text color
              label: { color: 'white' }, // Label text color
            },
          },
        }}
      />
    </LocalizationProvider>
  )
}

export default TimeSelector
