import React, { useState, useEffect } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Typography,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
  TablePagination,
  CircularProgress,
} from '@mui/material'
import { MdDelete } from 'react-icons/md'
import {
  DeleteContactDirectory,
  getContactDirectory,
} from '../apis/contactDirectory'
import { ToastContainer, toast } from 'react-toastify'
import { useTheme as useCustomTheme } from '../contexts/ThemeContext'
import { useTheme as useMuiTheme } from '@mui/material/styles'

const ContactDirectory = () => {
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState('username')
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(5)

  // Theme contexts
  const { isDarkMode, toggleDarkMode } = useCustomTheme()
  const muiTheme = useMuiTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'))

  // Dynamic theme colors based on dark mode
  const themeColors = {
    background: isDarkMode 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
      : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
    paperBg: isDarkMode ? '#1e293b' : '#ffffff',
    textPrimary: isDarkMode ? '#f1f5f9' : '#1e293b',
    textSecondary: isDarkMode ? '#cbd5e1' : '#64748b',
    searchBg: isDarkMode ? '#334155' : '#f1f5f9',
    hoverBg: isDarkMode ? '#2d3748' : '#e3f0fa',
    borderColor: isDarkMode ? '#475569' : '#e2e8f0',
    shadowColor: isDarkMode 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(28, 107, 160, 0.10)',
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data } = await getContactDirectory()
      setContacts(data)
      setFilteredContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      Object.values(contact).some(value =>
        value != null
          ? value.toString().toLowerCase().includes(search.toLowerCase())
          : false
      )
    )
    setFilteredContacts(filtered)
    setPage(0)
  }, [search, contacts])

  const handleSort = property => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)

    const sorted = [...filteredContacts].sort((a, b) => {
      if (isAsc) {
        return b[property] > a[property] ? 1 : -1
      }
      return a[property] > b[property] ? 1 : -1
    })
    setFilteredContacts(sorted)
  }

  const handleSelectAll = event => {
    if (event.target.checked) {
      const newSelected = getCurrentPageItems().map(contact => contact.username)
      setSelected(newSelected)
    } else {
      setSelected([])
    }
  }

  const handleSelect = username => {
    const selectedIndex = selected.indexOf(username)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = [...selected, username]
    } else {
      newSelected = selected.filter(item => item !== username)
    }

    setSelected(newSelected)
  }

  const handleDeleteConfirmation = username => {
    setDeleteTarget(username ? [username] : selected)
    setOpenDialog(true)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      for (const username of deleteTarget) {
        await DeleteContactDirectory(username)
      }
      setContacts(prevContacts =>
        prevContacts.filter(contact => !deleteTarget.includes(contact.username))
      )
      setFilteredContacts(prevFiltered =>
        prevFiltered.filter(contact => !deleteTarget.includes(contact.username))
      )
      setSelected([])
      setDeleteTarget(null)
      setOpenDialog(false)
      toast.info('Contacts deleted successfully!')
    } catch (error) {
      console.error('Error deleting contacts:', error)
      toast.error('Error deleting contacts. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const getCurrentPageItems = () => {
    return filteredContacts.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )
  }

  const tableHeaders = [
    { id: 'username', label: 'Username' },
    { id: 'email', label: 'Email' },
    { id: 'Division', label: 'Division' },
    { id: 'device_type', label: 'Device Type' },
    { id: 'device_id', label: 'Device ID' },
  ]

  return (
    <Box
      sx={{
        width: '100%',
        p: { xs: 1, sm: 3 },
        minHeight: '100vh',
        background: themeColors.background,
        borderRadius: { xs: 0, sm: '1.5rem' },
        boxShadow: { xs: 'none', sm: `0 8px 32px 0 ${themeColors.shadowColor}` },
        transition: 'all 0.4s ease-in-out',
        color: themeColors.textPrimary,
      }}
    >
      {/* Header with Dark Mode Toggle */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography 
          variant='h5' 
          component='h2' 
          fontWeight={700}
          sx={{ color: themeColors.textPrimary }}
        >
          Contact Directory
        </Typography>
        
        {/* Delete Selected Button */}
        {selected.length > 0 && (
          <Button
            variant='contained'
            color='error'
            startIcon={<MdDelete />}
            onClick={() => handleDeleteConfirmation()}
            sx={{
              borderRadius: '0.75rem',
              boxShadow: `0 2px 8px 0 ${themeColors.shadowColor}`,
              fontWeight: 600,
              px: 3,
              py: 1.5,
            }}
          >
            Delete Selected ({selected.length})
          </Button>
        )}
      </Box>

      <Paper
        elevation={3}
        sx={{
          borderRadius: '1.25rem',
          boxShadow: `0 4px 24px 0 ${themeColors.shadowColor}`,
          mb: 3,
          p: { xs: 2, sm: 3 },
          backgroundColor: themeColors.paperBg,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <TextField
          fullWidth
          variant='outlined'
          label='Search'
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{
            mb: 2,
            width: '100%',
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.75rem',
              backgroundColor: themeColors.searchBg,
              fontWeight: 500,
              color: themeColors.textPrimary,
              '& fieldset': {
                borderColor: themeColors.borderColor,
              },
              '&:hover fieldset': {
                borderColor: isDarkMode ? '#64748b' : '#94a3b8',
              },
              '&.Mui-focused fieldset': {
                borderColor: isDarkMode ? '#3b82f6' : '#2563eb',
              },
            },
            '& .MuiInputLabel-root': {
              fontWeight: 500,
              color: themeColors.textSecondary,
              '&.Mui-focused': {
                color: isDarkMode ? '#3b82f6' : '#2563eb',
              },
            },
          }}
        />

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '1rem',
            boxShadow: `0 2px 12px 0 ${themeColors.shadowColor}`,
            mt: 2,
            backgroundColor: themeColors.paperBg,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Table sx={{ minWidth: isMobile ? 300 : 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: isDarkMode ? '#374151' : '#f8fafc' }}>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={
                      getCurrentPageItems().length > 0 &&
                      selected.length === getCurrentPageItems().length
                    }
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < getCurrentPageItems().length
                    }
                    onChange={handleSelectAll}
                    sx={{
                      color: themeColors.textSecondary,
                      '&.Mui-checked': {
                        color: isDarkMode ? '#3b82f6' : '#2563eb',
                      },
                      '&.MuiCheckbox-indeterminate': {
                        color: isDarkMode ? '#3b82f6' : '#2563eb',
                      },
                    }}
                  />
                </TableCell>
                {tableHeaders.map(header => (
                  <TableCell
                    key={header.id}
                    onClick={() => handleSort(header.id)}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      letterSpacing: '0.01em',
                      userSelect: 'none',
                      color: themeColors.textPrimary,
                      transition: 'color 0.2s',
                      '&:hover': {
                        color: isDarkMode ? '#60a5fa' : '#1d4ed8',
                      },
                    }}
                  >
                    {header.label}
                    {orderBy === header.id && (
                      <span style={{ fontSize: '1.1em', color: isDarkMode ? '#3b82f6' : '#2563eb' }}>
                        {order === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: 'bold', color: themeColors.textPrimary }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getCurrentPageItems().length > 0 ? (
                getCurrentPageItems().map(contact => (
                  <TableRow
                    key={contact.username}
                    selected={selected.includes(contact.username)}
                    hover
                    sx={{
                      transition: 'background-color 0.2s',
                      backgroundColor: selected.includes(contact.username) 
                        ? (isDarkMode ? '#374151' : '#e0f2fe') 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: themeColors.hoverBg,
                      },
                    }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={selected.includes(contact.username)}
                        onChange={() => handleSelect(contact.username)}
                        sx={{
                          color: themeColors.textSecondary,
                          '&.Mui-checked': {
                            color: isDarkMode ? '#3b82f6' : '#2563eb',
                          },
                        }}
                      />
                    </TableCell>
                    {tableHeaders.map(header => (
                      <TableCell 
                        key={header.id}
                        sx={{ color: themeColors.textPrimary }}
                      >
                        {contact[header.id]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        color='error'
                        onClick={() => handleDeleteConfirmation(contact.username)}
                        sx={{
                          borderRadius: '0.5rem',
                          transition: 'all 0.2s',
                          color: '#ef4444',
                          '&:hover': {
                            backgroundColor: isDarkMode ? '#7f1d1d' : '#fee2e2',
                          },
                        }}
                      >
                        <MdDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableHeaders.length + 2}
                    align='center'
                    sx={{ py: 8 }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: 8,
                      color: themeColors.textSecondary
                    }}>
                      <span style={{ fontSize: '2rem' }}>🔍</span>
                      <span>No contacts found</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component='div'
          count={filteredContacts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
          sx={{
            mt: 2,
            color: themeColors.textPrimary,
            '.MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon': {
              display: 'none',
            },
            '.MuiTablePagination-displayedRows': {
              color: themeColors.textSecondary,
            },
            '.MuiIconButton-root': {
              color: themeColors.textSecondary,
              '&:hover': {
                backgroundColor: themeColors.hoverBg,
              },
              '&.Mui-disabled': {
                color: isDarkMode ? '#475569' : '#cbd5e1',
              },
            },
          }}
        />
      </Paper>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
        limit={3}
        className='toast-container'
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '1.25rem',
            boxShadow: `0 8px 32px 0 ${themeColors.shadowColor}`,
            minWidth: 320,
            backgroundColor: themeColors.paperBg,
            color: themeColors.textPrimary,
          },
        }}
      >
        <DialogTitle sx={{ color: themeColors.textPrimary }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ color: themeColors.textSecondary }}>
          Are you sure you want to delete {deleteTarget?.length} selected contact(s)?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            disabled={isDeleting}
            sx={{ 
              fontWeight: 600,
              color: themeColors.textSecondary,
              '&:hover': {
                backgroundColor: themeColors.hoverBg,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color='error'
            variant='contained'
            disabled={isDeleting}
            sx={{ fontWeight: 600, borderRadius: '0.75rem' }}
          >
            {isDeleting ? (
              <>
                <CircularProgress size={20} color='inherit' sx={{ mr: 1 }} />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ContactDirectory