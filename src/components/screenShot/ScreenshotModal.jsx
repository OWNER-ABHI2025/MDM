import React, { useState, useEffect, useMemo } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  AlertTitle,
  CircularProgress,
} from '@mui/material'
import { FaCamera, FaSearch, FaClock } from 'react-icons/fa'
import { MdSchedule } from 'react-icons/md'
import { IoMdCloseCircle } from 'react-icons/io'
import { BiTime } from 'react-icons/bi'
import { caputureScreenshots, getAllScreenShots, startTimer } from '../../apis/screenShots'

const ScreenshotModal = ({
  isOpen,
  onClose,
  type,
  devices,
  groups,
  onSuccess,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [scheduleType, setScheduleType] = useState('instant')
  const [interval, setInterval] = useState('5')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  useEffect(() => {
    setSelectedItems([])
    setSearchTerm('')
  }, [type, isOpen])

  const filteredItems = useMemo(() => {
    const items = type === 'single' ? devices : groups
    if (!searchTerm) return items

    return items?.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [type, devices, groups, searchTerm])

  const handleSearch = e => {
    setSearchTerm(e.target.value)
  }

  const handleCheckboxChange = item => {
    const value = type === 'single' ? item.id : item.name
    setSelectedItems(prev =>
      prev.includes(value)
        ? prev.filter(selectedValue => selectedValue !== value)
        : [...prev, value]
    )
  }

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setToast(prev => ({ ...prev, open: false }))
  }

  const showToast = (message, severity = 'success') => {
    setToast({
      open: true,
      message,
      severity,
    })
  }

  const handleCapture = async () => {
    setIsLoading(true)
    const timerType = type === 'single' ? 'users' : 'divisions'

    try {
      if (scheduleType === 'instant') {
        if (type === 'all') {
          await getAllScreenShots()
        } else {
          const payload = {
            device_ids: type === 'single' ? selectedItems : [],
            division_names: type === 'multiple' ? selectedItems : []
          }
          await caputureScreenshots(payload)
        }

        showToast(
          type === 'all'
            ? 'Screenshots captured for all devices'
            : `Screenshots captured for selected ${type === 'single' ? 'devices' : 'groups'}`
        )
      } else {
        const payload = {
          device_ids: type === 'single' ? selectedItems : [],
          division_names: type === 'multiple' ? selectedItems : [],
          interval_minutes: parseInt(interval),
          type: timerType,
        }
        console.log('payload', payload)
        const data = await startTimer(payload)
        console.log('data', data)
        showToast(
          `Screenshot schedule started - capturing every ${interval} minutes`
        )
      }

      await onSuccess()
      setSelectedItems([])
      setSearchTerm('')
      onClose()
    } catch (error) {
      showToast(
        scheduleType === 'instant'
          ? 'Failed to capture screenshots. Please try again.'
          : 'Failed to start scheduled captures. Please try again.',
        'error'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setSelectedItems([])
    setSearchTerm('')
    setScheduleType('instant')
    setInterval('5')
    onClose()
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth='sm'
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: '#0D2C49',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            m: 0,
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {scheduleType === 'instant' ? (
              <FaCamera className='text-gray-300' />
            ) : (
              <MdSchedule className='text-gray-300' />
            )}
            <Typography variant='h6' sx={{ color: 'white' }}>
              Take Screenshot - {type}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size='small'
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <IoMdCloseCircle />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {type !== 'all' && (
              <>
                <TextField
                  fullWidth
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        <FaSearch />
                      </Box>
                    ),
                    sx: {
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4FA8E0',
                      },
                    },
                  }}
                  sx={{ '& .MuiInputBase-input': { pl: 4 } }}
                />

                <Box
                  sx={{
                    maxHeight: '240px',
                    overflowY: 'auto',
                    border: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 1,
                    p: 1,
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                  }}
                >
                  {filteredItems?.map(item => (
                    <FormControlLabel
                      key={type === 'single' ? item.id : item.name}
                      control={
                        <Checkbox
                          checked={selectedItems.includes(
                            type === 'single' ? item.id : item.name
                          )}
                          onChange={() => handleCheckboxChange(item)}
                          sx={{
                            color: '#4FA8E0',
                            '&.Mui-checked': {
                              color: '#4FA8E0',
                            },
                          }}
                        />
                      }
                      label={item.name}
                      sx={{
                        width: '100%',
                        m: 0,
                        p: 1,
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 1,
                        },
                      }}
                    />
                  ))}
                </Box>
              </>
            )}

            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Screenshot Type
              </InputLabel>
              <Select
                value={scheduleType}
                onChange={e => setScheduleType(e.target.value)}
                label='Screenshot Type'
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4FA8E0',
                  },
                  '.MuiSvgIcon-root': {
                    color: 'white',
                  },
                }}
              >
                <MenuItem
                  value='instant'
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    color: '#0D2C49',
                  }}
                >
                  <FaCamera /> Instant Screenshot
                </MenuItem>
                <MenuItem
                  value='scheduled'
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    color: '#0D2C49',
                  }}
                >
                  <BiTime /> Scheduled Screenshot
                </MenuItem>
              </Select>
            </FormControl>

            {scheduleType === 'scheduled' && (
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Interval
                </InputLabel>
                <Select
                  value={interval}
                  onChange={e => setInterval(e.target.value)}
                  label='Interval'
                  sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4FA8E0',
                    },
                    '.MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem value='5' sx={{ color: '#0D2C49' }}>
                    Every 5 minutes
                  </MenuItem>
                  <MenuItem value='10' sx={{ color: '#0D2C49' }}>
                    Every 10 minutes
                  </MenuItem>
                  <MenuItem value='15' sx={{ color: '#0D2C49' }}>
                    Every 15 minutes
                  </MenuItem>
                  <MenuItem value='30' sx={{ color: '#0D2C49' }}>
                    Every 30 minutes
                  </MenuItem>
                </Select>
              </FormControl>
            )}

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant='outlined'
                onClick={handleClose}
                fullWidth
                size='large'
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                onClick={handleCapture}
                disabled={
                  isLoading || (selectedItems.length === 0 && type !== 'all')
                }
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color='inherit' />
                  ) : scheduleType === 'instant' ? (
                    <FaCamera />
                  ) : (
                    <FaClock />
                  )
                }
                fullWidth
                size='large'
                sx={{
                  backgroundColor: '#4FA8E0',
                  '&:hover': {
                    backgroundColor: '#1C6BA0',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'rgba(79, 168, 224, 0.3)',
                  },
                }}
              >
                {isLoading
                  ? 'Capturing...'
                  : scheduleType === 'instant'
                    ? 'Capture Now'
                    : 'Schedule Capture'}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#0D2C49',
          },
        }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant='filled'
          sx={{
            width: '100%',
            alignItems: 'center',
            ...(toast.severity === 'success' && {
              backgroundColor: '#4FA8E0',
              '& .MuiAlert-icon': {
                color: 'white',
              },
            }),
            ...(toast.severity === 'error' && {
              backgroundColor: '#f44336',
              '& .MuiAlert-icon': {
                color: 'white',
              },
            }),
          }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>
            {toast.severity === 'success' ? 'Success' : 'Error'}
          </AlertTitle>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ScreenshotModal
