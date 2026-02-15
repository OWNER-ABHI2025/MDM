// DataTable.jsx
import React, { 
  useCallback, 
  useEffect, 
  useState, 
  useMemo 
} from 'react'
import Pagination from '../Pagination'
import {
  deleteWorkflow,
  getAcks,
  getWorkflowHistory,
} from '../../apis/workflow'
import { RiDeleteBinLine } from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify'
import { MdEdit } from 'react-icons/md'
import WorkflowModal from './WorkflowModal'
import { LuBadgeCheck, LuBadgeX } from 'react-icons/lu'
import DeviceDetailsModal from './DeviceDetailsModal'
import { ContentLoader } from '../Loader'

export const DataTable = React.memo(({ searchTerm, tableUpdate, setCardData }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const itemsPerPage = 5
  const [table1Data, setTable1Data] = useState([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(null)
  const [noDataFound, setNoDataFound] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDevices, setSelectedDevices] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchWorkflowHistory = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await getWorkflowHistory()
      if (response.data.workflows && response.data.workflows.length > 0) {
        setTable1Data(response.data.workflows)
        setCardData(response.data.workflows)
        setNoDataFound(false)
      } else {
        setTable1Data([])
        setNoDataFound(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setTable1Data([])
      setNoDataFound(true)
    } finally {
      setIsLoading(false)
    }
  }, [setCardData])

  useEffect(() => {
    fetchWorkflowHistory()
    isWorkflowEditable()
  }, [tableUpdate, fetchWorkflowHistory])

  const filteredData = useMemo(() => 
    table1Data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), 
    [table1Data, searchTerm]
  )

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

    return { totalPages, indexOfLastItem, indexOfFirstItem, currentItems }
  }, [filteredData, currentPage, itemsPerPage])

  const handleDeleteClick = workflowId => {
    setSelectedWorkflowId(workflowId)
    setShowConfirmDialog(true)
  }

  const handleEditClick = workflow => {
    setSelectedWorkflow(workflow)
    setIsEditModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await deleteWorkflow(selectedWorkflowId)
      if (response.status === 200) {
        await fetchWorkflowHistory()
        toast.info('Workflow deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting workflow:', error)
    } finally {
      setIsDeleting(false)
      setShowConfirmDialog(false)
      setSelectedWorkflowId(null)
    }
  }

  const isWorkflowEditable = workflow => {
    return workflow?.published === false || workflow?.status === 'draft'
  }

  const getWorkflowStatus = workflow => {
    if (workflow.status === 'completed') return 'completed'
    if (workflow.status === 'draft') return 'draft'
    if (workflow.status === 'live') {
      if (workflow.type === 'scheduled') {
        const scheduleTime = new Date(workflow.schedule_time)
        return scheduleTime < new Date() ? 'completed' : 'live'
      }
      return 'live'
    }
    return workflow.status
  }

  const ConfirmDialog = ({ onConfirm, onCancel, isDeleting }) => (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 
        transition-opacity duration-300 ease-in-out'
    >
      <div
        className={`
          bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4
          transform transition-all duration-300 ease-out
          animate-fadeIn
        `}
      >
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-4'>
          Confirm Deletion
        </h3>
        <p className='text-gray-500 dark:text-gray-400 mb-4'>
          Are you sure you want to delete this workflow? This action cannot be
          undone.
        </p>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className='px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md
              transition-all duration-200 ease-in-out hover:scale-105 disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className='px-4 py-2 bg-red-500 text-white font-medium rounded-md 
              hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 
              focus:ring-offset-2 transition-all duration-200 ease-in-out
              hover:scale-105 disabled:opacity-50 flex items-center justify-center min-w-[80px]'
          >
            {isDeleting ? (
              <svg
                className='animate-spin h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  )



  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      if (currentPage > 3) {
        pageNumbers.push('...')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...')
      }
      pageNumbers.push(totalPages)
    }
    return pageNumbers
  }

  const fetchAckDetails = async id => {
    try {
      setIsLoading(true)
      const response = await getAcks(id)
      setSelectedDevices(response.data.acks)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error fetching ack details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full'>
      {isLoading ? <ContentLoader/> :
      <div className='w-full overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700 border dark:border-gray-700 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800'>
          <thead className='bg-gradient-to-r from-[#1C6BA0] to-[#2A8BC8] dark:from-gray-700 dark:to-gray-800'>
            <tr>
              <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                S.no
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Type
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Publish
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Schedule Time
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Priority
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Acknowledgement
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800 rounded-b-lg'>
            {currentItems &&
            noDataFound === false &&
            currentItems.length > 0 ? (
              currentItems.map((item, idx) => {
                const status = getWorkflowStatus(item)
                return (
                  <tr
                    key={item.workflow_id}
                    className='hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out transform hover:shadow-md'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300'>
                      {indexOfFirstItem + idx + 1}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300'>
                      {item.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300'>
                      {item.type}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <span
                        className={`px-4 py-2 rounded-full ${
                          item.status === 'live'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <div className='flex items-center justify-center'>
                        {item.published === true ? (
                          <div className='p-1.5 rounded-full bg-blue-100 dark:bg-blue-900'>
                            <LuBadgeCheck className='w-5 h-5 text-blue-800 dark:text-blue-300' />
                          </div>
                        ) : (
                          <div className='p-1.5 rounded-full bg-red-100 dark:bg-red-900'>
                            <LuBadgeX className='w-5 h-5 text-red-800 dark:text-red-300' />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300'>
                      {item.schedule_time
                        ? new Date(item.schedule_time).toLocaleString()
                        : '-'}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <span
                        className={`px-4 py-2 rounded-full ${
                          item.priority === '1'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : item.priority === '2'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              : item.priority === '3'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {item.priority === '1'
                          ? 'High'
                          : item.priority === '2'
                            ? 'Medium'
                            : item.priority === '3'
                              ? 'Low'
                              : '-'}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300'>
                      <div className='flex flex-col'>
                        <button
                          onClick={() => fetchAckDetails(item.workflow_id)}
                          className='text-blue-600 hover:text-blue-800 mb-1'
                        >
                          {isLoading ? 'Loading...' : `View Devices`}
                        </button>
                      </div>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      {isWorkflowEditable(item) && (
                        <button
                          onClick={() => handleEditClick(item)}
                          className='group relative p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-300'
                        >
                          <MdEdit className='w-5 h-5 text-blue-500 transform group-hover:scale-110 group-hover:text-blue-600 transition-all duration-300' />
                          <span className='absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 z-10'>
                            Edit
                          </span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(item.workflow_id)}
                        disabled={isDeleting}
                        className='group relative p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50 transition-all duration-300'
                      >
                        <RiDeleteBinLine className='w-5 h-5 text-red-500 transform group-hover:scale-110 group-hover:text-red-600 transition-all duration-300' />
                        <span className='absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 z-10'>
                          Delete
                        </span>
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className='px-6 py-8 text-center text-gray-500 dark:text-gray-400'
                >
                  {searchTerm
                    ? `No results found for "${searchTerm}"`
                    : 'No data available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {showConfirmDialog && (
          <ConfirmDialog
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowConfirmDialog(false)}
            isDeleting={isDeleting}
          />
        )}
      </div>
}
      <DeviceDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedDevices(null)
        }}
        devices={selectedDevices}
      />

      {isEditModalOpen && selectedWorkflow && (
        <WorkflowModal
          onClose={() => setIsEditModalOpen(false)}
          editMode={true}
          initialData={selectedWorkflow}
          table1Data={table1Data}
          setTable1Data={setTable1Data}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        data={table1Data}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        setCurrentPage={setCurrentPage}
        getPageNumbers={getPageNumbers}
      />
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
        theme='light'
        limit={3}
        className='toast-container'
      />
    </div>
  )
})
