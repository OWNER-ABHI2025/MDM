import React, { useEffect, useState } from 'react'
import { getAllDevices } from '../../apis/devicesAPI'
import { createGroup, getAllGroups } from '../../apis/groupsAPI'

interface User {
  id: string
  name: string
}

interface Group {
  id: string
  name: string
  device_count?: number
}

interface SelectionModalProps {
  isOpen: boolean
  onClose: () => void
  notificationType: string
  formData: any
  setFormData: (data: any) => void
  setUserCount: (count: number) => void
  setDivisionCount: (count: number) => void
}

export const SelectionModal: React.FC<SelectionModalProps> = ({
  isOpen,
  onClose,
  notificationType,
  formData,
  setFormData,
  setUserCount,
  setDivisionCount,
}) => {
  const [users, setUsers] = useState<User[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([])
  const [groupName, setGroupName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [mode, setMode] = useState<'view' | 'create'>('view')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (notificationType === 'User') {
          const userDevices = await getAllDevices()
          setUsers(userDevices)
          setFilteredUsers(userDevices)
          setSelectedUsers([])
        } else if (notificationType === 'Division') {
          const allGroups = await getAllGroups()
          setGroups(allGroups)
          setFilteredGroups(allGroups)
          setSelectedGroups([])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [notificationType])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (notificationType === 'User') {
      setFilteredUsers(
        users.filter(user =>
          user.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    } else if (notificationType === 'Division') {
      setFilteredGroups(
        groups.filter(group =>
          group.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    }
  }

  const handleUserSelection = (user: User) => {
    setSelectedUsers(prev => {
      const isSelected = prev.some(u => u.id === user.id)
      return isSelected ? prev.filter(u => u.id !== user.id) : [...prev, user]
    })
  }

  const handleGroupSelection = (group: Group) => {
    setSelectedGroups(prev => {
      const isSelected = prev.some(g => g.id === group.id)
      return isSelected ? prev.filter(g => g.id !== group.id) : [...prev, group]
    })
  }

  const handleConfirmSelection = () => {
    if (notificationType === 'User') {
      setFormData({
        ...formData,
        NotificationType: 'User',
        ids: selectedUsers.map(user => user.id)
      })
      setUserCount(selectedUsers.length)
    } else if (notificationType === 'Division') {
      setFormData({
        ...formData,
        NotificationType: 'Division',
        ids: selectedGroups.map(group => group.id)
      })
      setDivisionCount(selectedGroups.length)
    }
    onClose()
  }

  const handleCreateDivision = async () => {
    if (groupName.trim() && selectedUsers.length > 0) {
      try {
        await createGroup({
          Division_name: groupName,
          device_ids: selectedUsers.map(user => user.id)
        })
        setGroupName('')
        setSelectedUsers([])
        const updatedGroups = await getAllGroups()
        setGroups(updatedGroups)
        setFilteredGroups(updatedGroups)
        setMode('view')
      } catch (error) {
        console.error('Error creating division:', error)
      }
    }
  }

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
        {notificationType === 'User' 
          ? 'Select Users'
          : (mode === 'create' ? 'Create New Division' : 'Select Divisions')}
      </h2>
      <div className="flex items-center space-x-2">
        {mode === 'view' && notificationType === 'Division' && (
          <button
            onClick={() => {
              setMode('create')
              setSelectedUsers([])
              getAllDevices().then(devices => {
                setUsers(devices)
                setFilteredUsers(devices)
              })
            }}
            className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Create Division
          </button>
        )}
        <button 
          onClick={() => {
            if (mode === 'create') {
              setMode('view')
              setSelectedUsers([])
              getAllGroups().then(groups => {
                setGroups(groups)
                setFilteredGroups(groups)
              })
            } else {
              onClose()
            }
          }}
          className="text-gray-400 hover:text-gray-500 transition-colors p-1"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )

  const renderCreateDivisionForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Division Name
        </label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          placeholder="Enter division name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Select Users for Division
        </label>
        <div className="max-h-[40vh] overflow-y-auto space-y-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelection(user)}
              className={`flex items-center p-2 sm:p-3 border rounded-lg cursor-pointer 
                transition-all duration-200 hover:shadow-md
                ${
                  selectedUsers.some(u => u.id === user.id)
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              <div className="flex-grow min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </div>
              </div>
              <input
                type="checkbox"
                checked={selectedUsers.some(u => u.id === user.id)}
                onChange={() => handleUserSelection(user)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                onClick={e => e.stopPropagation()}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleCreateDivision}
        disabled={!groupName.trim() || selectedUsers.length === 0}
        className={`w-full px-4 py-2 rounded-lg transition-colors
          ${
            !groupName.trim() || selectedUsers.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
      >
        Create Division
      </button>
    </div>
  )

  const renderSearch = () => (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => handleSearch(e.target.value)}
        placeholder={`Search ${notificationType === 'User' ? 'users' : 'divisions'}...`}
        className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 text-xs sm:text-sm md:text-base 
          border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
          dark:bg-gray-700 dark:border-gray-600 transition-all"
      />
    </div>
  )


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-2 sm:p-4 lg:p-6">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full 
          max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw] xl:max-w-[55vw] 
          p-3 sm:p-4 md:p-6 lg:p-8">
          
          {renderHeader()}
          
          {mode === 'create' && notificationType === 'Division' ? (
            renderCreateDivisionForm()
          ) : (
            <>
              {renderSearch()}
              {notificationType === 'User' ? (
                <div className="max-h-[40vh] overflow-y-auto space-y-2 mb-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleUserSelection(user)}
                      className={`flex items-center p-2 sm:p-3 border rounded-lg cursor-pointer 
                        transition-all duration-200 hover:shadow-md
                        ${
                          selectedUsers.some(u => u.id === user.id)
                            ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      <div className="flex-grow min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedUsers.some(u => u.id === user.id)}
                        onChange={() => handleUserSelection(user)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        onClick={e => e.stopPropagation()}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="max-h-[40vh] overflow-y-auto space-y-2 mb-4">
                  {filteredGroups.map((group) => (
                    <div
                      key={group.id}
                      onClick={() => handleGroupSelection(group)}
                      className={`flex items-center p-2 sm:p-3 border rounded-lg cursor-pointer 
                        transition-all duration-200 hover:shadow-md
                        ${
                          selectedGroups.some(g => g.id === group.id)
                            ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      <div className="flex-grow min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {group.name}
                        </div>
                        {group.device_count && (
                          <div className="text-xs text-gray-500">
                            {group.device_count} users
                          </div>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedGroups.some(g => g.id === group.id)}
                        onChange={() => handleGroupSelection(group)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        onClick={e => e.stopPropagation()}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-2 pt-3 border-t">
                <button
                  onClick={handleConfirmSelection}
                  disabled={notificationType === 'User' ? selectedUsers.length === 0 : selectedGroups.length === 0}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors
                    ${
                      (notificationType === 'User' ? selectedUsers.length === 0 : selectedGroups.length === 0)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                  Confirm Selection ({notificationType === 'User' ? selectedUsers.length : selectedGroups.length})
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}