import React, { useState, useEffect } from 'react'
import { FaSearch, FaEye } from 'react-icons/fa'
import { IoMdDownload } from 'react-icons/io'
import {
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Container,
  Snackbar,
  Alert,
} from '@mui/material'
import {
  getScreenshotHistory,
  startTimer,
  stopTimer,
} from '../../apis/screenShots'
import ImagePreviewModal from './ImagePreviewModal'

const ScreenshotTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [previewImage, setPreviewImage] = useState(null)
  const itemsPerPage = 10
  const [downloading, setDownloading] = useState(null)
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const [switchState, setSwitchState] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [timerStates, setTimerStates] = useState({})
  const [screenshots, setScreenshots] = useState([])

  const updateTableData = async () => {
    try {
      const data = await getScreenshotHistory()
      setScreenshots(data.screenshot_details)
    } catch (error) {
      console.error('Error fetching updated screenshots:', error)
    }
  }

  useEffect(() => {
    updateTableData()
  }, [timerStates])


  const handleDownload = async screenshot => {
    if (downloading) return

    setDownloading(screenshot.screenshot_id)
    try {
      const response = await fetch(screenshot.storage_url)

      if (!response.ok) {
        throw new Error('Download failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = screenshot.file_name || 'screenshot.png'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(url)

      setNotification({
        open: true,
        message: 'Download completed successfully',
        severity: 'success',
      })
    } catch (error) {
      console.error('Download failed:', error)
      setNotification({
        open: true,
        message: 'Failed to download the screenshot',
        severity: 'error',
      })
    } finally {
      setDownloading(null)
    }
  }

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }))
  }

  const handleStart = async (deviceId, interval_minutes) => {
    try {
      setIsLoading(true)
      const payload = {
        device_ids: [deviceId],
        division_names: [],
        interval_minutes: interval_minutes,
        type: 'users',
      }
      console.log(payload)
      const response = await startTimer(payload)
      console.log(response)

      setTimerStates(prev => ({ ...prev, [deviceId]: true }))
      setNotification({
        open: true,
        message: 'Timer started successfully',
        severity: 'success',
      })
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to start timer',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStop = async (deviceId, stopAll = false) => {
    console.log(stopAll)
    try {
      setIsLoading(true)
      const payload = {
        device_ids: stopAll ? [] : [deviceId],
        division_names: [],
        stop_all: stopAll,
      }
      console.log(payload)
      const response = await stopTimer(payload)
      console.log(response)

      if (stopAll) {
        console.log(deviceId)
        setTimerStates({})
      } else {
        setTimerStates(prev => ({ ...prev, [deviceId]: false }))
      }
      setNotification({
        open: true,
        message: `Timer ${stopAll ? 'all stopped' : 'stopped'} successfully`,
        severity: 'success',
      })
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to stop timer',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwitchChange = async (deviceId, interval_minutes, event) => {
    const isChecked = event.target.checked
    if (isChecked) {
      handleStart(deviceId, interval_minutes)
    } else {
      handleStop(deviceId)
    }
  }

  const StopAllButton = () => (
    <Button
      variant='contained'
      disabled={isLoading}
      onClick={() => handleStop(null, true)}
      sx={{
        backgroundColor: '#4FA8E0',
        color: 'white',
        '&:hover': {
          backgroundColor: '#3d86b3',
        },
        mb: 2,
        '@media (max-width: 600px)': {
          width: '100%',
        },
      }}
    >
      {isLoading ? 'Stopping...' : 'Stop All Timers'}
    </Button>
  )

  const filteredScreenshots = screenshots.filter(
    screenshot =>
      screenshot.file_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      screenshot.device_id.toString().includes(searchTerm)
  )

  const paginatedScreenshots = filteredScreenshots.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <Container>
      <Paper sx={{ p: 3, mt: 3, backgroundColor: '#0D2C49', color: 'white' }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <TextField
            fullWidth
            placeholder='Search screenshots...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
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
          <Box sx={{ flexShrink: 0 }}>
            <StopAllButton />
          </Box>
        </Box>

        <TableContainer sx={{ backgroundColor: '#0D2C49' }}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  'Screenshot ID',
                  'Device ID',
                  'Device Info',
                  'File Name',
                  'Created At',
                  'Interval (min)',
                  'Timer Status',
                  'Actions',
                ].map(header => (
                  <TableCell
                    key={header}
                    sx={{
                      color: '#4FA8E0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      fontWeight: 'bold',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedScreenshots.map(screenshot => (
                <TableRow
                  key={screenshot.screenshot_id}
                  hover
                  sx={{
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
                    '& td': {
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white',
                    },
                  }}
                >
                  <TableCell>{screenshot.screenshot_id}</TableCell>
                  <TableCell>{screenshot.device_id}</TableCell>
                  <TableCell>{screenshot.device_info}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {screenshot.file_name || '-'}
                  </TableCell>
                  <TableCell>
                    {new Date(screenshot.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{screenshot.interval_minutes}</TableCell>
                  <TableCell>
                    <Switch
                      checked={screenshot.is_enabled}
                      onChange={e =>
                        handleSwitchChange(screenshot.device_id, screenshot.interval_minutes, e)
                      }
                      disabled={isLoading}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#4FA8E0',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                        {
                          backgroundColor: '#4FA8E0',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {screenshot.storage_url && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          onClick={() =>
                            setPreviewImage(screenshot.storage_url)
                          }
                          size='small'
                          sx={{ color: '#4FA8E0' }}
                        >
                          <FaEye />
                        </IconButton>
                        <IconButton
                          size='small'
                          onClick={() => handleDownload(screenshot.storage_url)}
                          sx={{ color: '#4FA8E0' }}
                        >
                          <IoMdDownload />
                        </IconButton>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 3,
          }}
        >
          <Button
            variant='contained'
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
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
            Previous
          </Button>
          <Typography sx={{ color: 'white' }}>
            Page {page} of{' '}
            {Math.ceil(filteredScreenshots.length / itemsPerPage)}
          </Typography>
          <Button
            variant='contained'
            onClick={() => setPage(p => p + 1)}
            disabled={paginatedScreenshots.length < itemsPerPage}
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
            Next
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <ImagePreviewModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage}
      />
    </Container>
  )
}

export default ScreenshotTable
