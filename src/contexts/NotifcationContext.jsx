/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  // workflow name and message
  const [workflowName, setWorkflowName] = useState('')
  const [message, setMessage] = useState('')

  // priority
  const [selectedPriority, setSelectedPriority] = useState('High')

  // device
  const [selectedDevice, setSelectedDevice] = useState('All')

  const [showUserSelector, setShowUserSelector] = useState(false)
  const [selectedUser, setSelectedUser] = useState([])

  const [showGroupSelector, setShowGroupSelector] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState([])

  const [showCreateGroup, setShowCreateGroup] = useState(false)

  return (
    <NotificationContext.Provider
      value={{
        workflowName,
        setWorkflowName,
        message,
        setMessage,
        selectedPriority,
        setSelectedPriority,
        selectedDevice,
        setSelectedDevice,
        showUserSelector,
        setShowUserSelector,
        selectedUser,
        setSelectedUser,
        showGroupSelector,
        setShowGroupSelector,
        selectedGroup,
        setSelectedGroup,
        showCreateGroup,
        setShowCreateGroup,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)