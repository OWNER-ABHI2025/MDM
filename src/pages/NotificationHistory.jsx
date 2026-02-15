/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteModal from '../components/DeleteModal'
import Pagination from '../components/Pagination'
import {
  FaRegEye,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaInbox,
} from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { deleteNotification, getNotificationHistory } from '../apis/notificationAPI'

const NotificationHistory = () => {
  const [tableData, setTableData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })

  const rowsPerPage = 10
  const indexOfLastItem = currentPage * rowsPerPage
  const indexOfFirstItem = indexOfLastItem - rowsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)

  const getPageNumbers = () => {
    const pageNumbers = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }
    return pageNumbers
  }

  const fetchNotificationHistory = async () => {
    try {
      setIsLoading(true);
  
      const response = await getNotificationHistory();

      const data = response.data.workflows;
      if (!data) {
        setTableData([]);
        setFilteredData([]);
        return;
      }
  
      const notifications = Array.isArray(data)
        ? data
        : data.notifications || [];
  
      const transformedData = notifications.map(item => ({
        id: item.workflow_id,
        name: item.name || 'No Name',
        priority:item.priority,
        devices: item.notification_type,
        dateCreated: item.schedule_time
          ? new Date(item.schedule_time).toISOString()
          : new Date().toISOString(),
        message: item.body,
        type: item.type[0].toUpperCase() + item.type.slice(1),

      }));
  
      setTableData(transformedData);
      setFilteredData(transformedData);
    } catch (error) {
      setError(error.message);
      toast.error(
        error.response?.status === 404
          ? 'No notifications found.'
          : error.message === 'Network Error'

          ? 'Network error. Please check your connection.'
          : 'Failed to fetch notifications'
      );
  
      setTableData([]);
      setFilteredData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = item => {
    setItemToDelete(item)
    setIsDeleteModalOpen(true)
  }

const handleDeleteConfirm = async () => {
  if (!itemToDelete) return;
  
  setIsDeleting(true);
  try {
    await deleteNotification(itemToDelete.id);
    
    setTableData(prevTableData => 
      prevTableData.filter(item => item.id !== itemToDelete.id)
    );
    setFilteredData(prevFilteredData => 
      prevFilteredData.filter(item => item.id !== itemToDelete.id)
    );
    
    toast.info('Notification deleted successfully!');
  } catch (error) {
    toast.error(
      error.response?.status === 404 
        ? 'Notification not found.' 
        : 'Failed to delete notification'
    );
  } finally {
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  }
};


  useEffect(() => {
    fetchNotificationHistory()
  }, [])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C6BA0]'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen text-red-600'>
        Error: {error}
      </div>
    )
  }

  const handleSort = key => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
    setFilteredData(sortedData)
  }

  return (
    <>
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
        theme=  'light'
        limit={3} 
        className='toast-container'
      />

      <div className='container mx-auto p-2 sm:p-4 bg-gray-100 dark:bg-gray-900'>
        <div className='rounded-lg shadow-lg p-3 sm:p-6 bg-white dark:bg-gray-800'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4'>
            <h1 className='text-xl sm:text-2xl font-bold text-primary dark:text-white'>
              Past Notifications
            </h1>
            <div className='relative w-full sm:w-64'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaSearch className='h-5 w-5 text-gray-500 dark:text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Search workflows...'
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value)
                  const term = e.target.value.toLowerCase()
                  const filtered = tableData.filter(item =>
                    Object.values(item).some(value =>
                      value?.toString().toLowerCase().includes(term)
                    )
                  )
                  setFilteredData(filtered)
                  setCurrentPage(1)
                }}
                className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C6BA0] focus:border-transparent
              bg-white dark:bg-gray-700 
              border-gray-300 dark:border-gray-600 
              text-gray-900 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400'
              />
            </div>
          </div>

          {filteredData.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-lg border border-gray-100'>
              <div className='bg-[#1C6BA0]/10 rounded-full p-6 mb-6'>
                <FaInbox className='w-16 h-16 text-[#1C6BA0]' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                No Notifications Found
              </h3>
              {searchTerm ? (
                <div className='text-center'>
                  <p className='text-gray-500 mb-4'>
                    No notifications match "{searchTerm}"
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setFilteredData(tableData)
                    }}
                    className='text-[#1C6BA0] hover:text-[#1C6BA0]/80 font-medium'
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <p className='text-gray-500 text-center max-w-sm'>
                  When notifications are available, they will appear here
                </p>
              )}
            </div>
          ) : (
            <div className='overflow-x-auto rounded-lg shadow-lg'>
              <table className='w-full table-auto border-collapse border-gray-300 dark:border-gray-700'>
                <thead>
                  <tr className='bg-[#1C6BA0] dark:bg-gray-700 text-white text-xs sm:text-sm'>
                    {[
                      { key: 'id', label: 'ID' },
                      { key: 'name', label: 'Name' },
                      { key: 'priority', label: 'Priority' },
                      { key: 'devices', label: 'Devices' },
                      { key: 'dateCreated', label: 'Date Created' },
                      { key: 'message', label: 'Message' },
                      { key: 'type', label: 'Type' },
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        className={`p-2 border border-gray-300 dark:border-gray-700 ${
                          key === 'priority' ||
                          key === 'devices' ||
                          key === 'dateCreated'
                            ? 'hidden sm:table-cell'
                            : ''
                        } cursor-pointer`}
                        onClick={() => handleSort(key)}
                      >
                        <div className='flex items-center justify-between'>
                          {label}
                          <span className='ml-2'>
                            {sortConfig.key === key ? (
                              sortConfig.direction === 'asc' ? (
                                <FaSortUp className='inline' />
                              ) : (
                                <FaSortDown className='inline' />
                              )
                            ) : (
                              <FaSort className='inline' />
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                    <th className='p-2 border border-gray-300 dark:border-gray-700'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item,index) => (
                    <tr
                      key={item.id}
                      className='hover:bg-gray-100 dark:hover:bg-gray-700'
                    >
                      <td className='p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-200'>
                        {index + 1 + indexOfFirstItem}
                      </td>
                      <td className='p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-200'>
                        {item.name}
                      </td>
                      <td className='hidden sm:table-cell p-2 border border-gray-300 dark:border-gray-700'>
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                            item.priority === '1'
                              ? 'bg-red-100 text-red-800'
                              : item.priority === '2'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {item.priority === '1'
                            ? 'High'
                            : item.priority === '2'
                              ? 'Medium'
                              : 'Low'}
                        </span>
                      </td>
                      <td className='hidden sm:table-cell p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-200'>
                        {item.devices}
                      </td>
                      <td className='hidden sm:table-cell p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-200'>
                        {new Date(item.dateCreated).toLocaleDateString()}
                      </td>
                      <td className='hidden sm:table-cell p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-200'>
                        {item.message}
                      </td>
                      <td className='hidden sm:table-cell p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-200'>
                        {item.type}
                      </td>
                      <td className='p-2 border border-gray-300 dark:border-gray-700'>
                        <div className='flex items-center gap-2 justify-center'>
                         
                          <button
                            className='flex items-center p-1.5 rounded-md transition-all duration-300
                          bg-red-50 dark:bg-gray-700 
                          text-red-500 dark:text-red-400 
                          hover:bg-red-500 dark:hover:bg-red-500 
                          hover:text-white'
                            onClick={() => handleDeleteClick(item)}
                            disabled={isDeleting}
                          >                        
                              <MdDelete size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filteredData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              data={filteredData}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
              setCurrentPage={setCurrentPage}
              getPageNumbers={getPageNumbers}
            />
          )}

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false)
              setItemToDelete(null)
            }}
            onDelete={handleDeleteConfirm}
            itemName={itemToDelete?.name}
            isDeleting={isDeleting}
          />
        </div>
      </div>
    </>
  )
}

export default NotificationHistory
