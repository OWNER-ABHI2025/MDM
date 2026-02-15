// WorkflowModal.jsx
import React, { useState, useEffect, useCallback } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { createWorkflow, editWorkflow } from '../../apis/workflow'
import { SelectionModal } from './SelectionModal'

const WorkflowModal = React.memo(({ 
  onClose, 
  setTableUpdate, 
  editMode = false, 
  initialData = null,
  table1Data,
  setTable1Data 
}) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)
  const [userCount, setUserCount] = useState(0)
  const [divisionCount, setDivisionCount] = useState(0)

  const [formData, setFormData] = useState({
    body: '',
    name: '',
    priority: '3',
    ids: [],
    WorkflowType: 'immediate',
    NotificationType: '',
    timestamp: null,
  })

  useEffect(() => {
    if (editMode && initialData) {
      setFormData({
        ...initialData,
        timestamp: initialData.timestamp 
          ? new Date(initialData.timestamp).toISOString()
          : null,
        WorkflowType: initialData.type || 'scheduled',
        NotificationType: initialData.notification_type || '',
        body: initialData.body || '',
        name: initialData.name || '',
        priority: initialData.priority || '',
        published: initialData.published ?? false,
        status: initialData.status || '',
        ids: initialData.ids || [],
      });
  
      if (initialData.ids) {
        if (initialData.notification_type === 'User') {
          setUserCount(initialData.ids.length);
        } else if (initialData.notification_type === 'Division') {
          setDivisionCount(initialData.ids.length);
        }
      }
    }
  }, [editMode, initialData]);
  

  const validateForm = useCallback((isDraft) => {
    const errors = []
    if (!formData.name.trim()) {
      errors.push('Name is required')
    }
    if (!formData.NotificationType) {
      errors.push('Notification Type is required')
    }
    if (!formData.body) {
      errors.push('Body is required')
    }
    if (!isDraft) {
      if (!formData.body.trim()) {
        errors.push('Body is required')
      }
      if (formData.NotificationType !== 'All' && formData.ids.length === 0) {
        errors.push(
          `Please select at least one ${formData.NotificationType.toLowerCase()}`
        )
      }
      if (
        formData.WorkflowType === 'scheduled' &&
        !formData.timestamp
      ) {
        errors.push('Schedule date and time is required')
      }
    }
    return errors
  }, [formData])

  const handleSubmit = useCallback(async (e, isDraft = false) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
  
    const validationErrors = validateForm(isDraft)
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '))
      setIsLoading(false)
      return
    }
  
    try {
      const submissionData = {
        ...formData,
        status: isDraft ? 'draft' : 'live',
        ids: formData.NotificationType === 'All' ? [] : formData.ids,
        ...(formData.WorkflowType === 'scheduled' 
          ? { timestamp: new Date(formData.timestamp).toISOString() }
          : {}
        ),
      }
      
      let response
      if (editMode && initialData) {
        response = await editWorkflow(initialData.workflow_id, submissionData)
        if (response.status === 200) {
          console.log('Response:', response.data.workflow)
          const updatedWorkflow = response.data.workflow
          setTable1Data(prevData => {
            return prevData.map(item => 
              item.workflow_id === updatedWorkflow.workflow_id 
                ? { ...item, ...updatedWorkflow } 
                : item
            )
          })
        }
      }
       else {
        response = await createWorkflow(submissionData)
      }
  
      if (response.status === 200) {
        setIsSuccess(true)
        setTableUpdate(prev => !prev)
        onClose() 
      }
    } catch (error) {
      setError(
        error.response?.status === 422
          ? 'Empty or invalid input. Please check your entries.'
          : error.message || 'An error occurred'
      )
    } finally {
      setIsLoading(false)
    }
  }, [
    formData, 
    editMode, 
    initialData, 
    validateForm, 
    setTable1Data, 
    setTableUpdate, 
    onClose
  ])

  const handleButtonClick = useCallback((type) => {
    setFormData(prev => ({
      ...prev,
      NotificationType: type,
      ids: [],
    }))
    setError(null)
    setUserCount(0)
    setDivisionCount(0)
    if (type !== 'All') {
      setIsSelectionModalOpen(true)
    }
  }, [])

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
    <div className='flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
      <div className='fixed inset-0 bg-black/60' onClick={onClose}></div>
      <div className='relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-4 sm:p-6 lg:p-8'>
        {!isSuccess ? (
          <>
            <div className='mb-4'>
              <h2 className='text-xl font-bold text-gray-800 dark:text-white'>
                {editMode ? 'Edit Workflow' : 'New Workflow'}
              </h2>
            </div>

              {error && (
                <div className='text-red-500 text-sm mb-4 p-2 bg-red-50 rounded'>
                  {error}
                </div>
              )}

              <form
                onSubmit={e => handleSubmit(e, false)}
                className='space-y-4'
              >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'>
                      Name
                    </label>
                    <input
                      type='text'
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700'
                      value={formData.name}
                      onChange={e =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'>
                      Priority
                    </label>
                    <div className='relative'>
                      <div className='flex items-center'>
                        <select
                          required
                          className='w-full px-3 py-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700'
                          value={formData.priority}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              priority: e.target.value,
                            })
                          }
                        >
                          <option value='3'>Low</option>
                          <option value='2'>Medium</option>
                          <option value='1'>High</option>
                        </select>
                        <div className='absolute left-3 flex items-center'>
                          <span
                            className={`h-3 w-3 rounded-full ${
                              formData.priority === '3'
                                ? 'bg-green-500'
                                : formData.priority === '2'
                                  ? 'bg-yellow-500'
                                  : formData.priority === '1'
                                    ? 'bg-red-600'
                                    : 'bg-gray-300'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'>
                      Workflow Type
                    </label>
                    <select
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700'
                      value={formData.WorkflowType}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          WorkflowType: e.target.value,
                        })
                      }
                    >
                      <option value='immediate'>Immediate</option>
                      <option value='scheduled'>Scheduled</option>
                    </select>
                  </div>

                  {formData.WorkflowType === 'scheduled' && (
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'>
                        Schedule Date & Time
                      </label>
                      <div className='flex gap-2'>
                        <input
                          type='datetime-local'
                          className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700'
                          value={formData.timestamp || ''}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              timestamp: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3'>
                    Notification Type
                  </label>
                  <div className='flex flex-wrap gap-4'>
                    <button
                      type='button'
                      onClick={() => handleButtonClick('User')}
                      className={`
                        flex-1 cursor-pointer rounded-lg border-2 p-4 text-center
                        transition-all duration-200 hover:shadow-md hover:scale-105
                        ${
                          formData.NotificationType === 'User'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-gray-200 dark:border-gray-700'
                        }
                      `}
                    >
                      <div className='relative flex justify-center mb-2'>
                        <svg
                          className={`w-6 h-6 ${formData.NotificationType === 'User' ? 'text-blue-500' : 'text-gray-400'}`}
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                          />
                        </svg>
                        {userCount > 0 && (
                          <div className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                            {userCount}
                          </div>
                        )}
                      </div>
                      <div className='flex flex-col items-center'>
                        <span
                          className={`font-medium ${
                            formData.NotificationType === 'User'
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          User
                        </span>
                      </div>
                    </button>

                    <button
                      type='button'
                      onClick={() => handleButtonClick('Division')}
                      className={`
                        flex-1 cursor-pointer rounded-lg border-2 p-4 text-center
                        transition-all duration-200 hover:shadow-md hover:scale-105
                        ${
                          formData.NotificationType === 'Division'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-gray-200 dark:border-gray-700'
                        }
                      `}
                    >
                      <div className='relative flex justify-center mb-2'>
                        <svg
                          className={`w-6 h-6 ${formData.NotificationType === 'Division' ? 'text-blue-500' : 'text-gray-400'}`}
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                          />
                        </svg>
                        {divisionCount > 0 && (
                          <div className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                            {divisionCount}
                          </div>
                        )}
                      </div>
                      <span
                        className={`font-medium ${
                          formData.NotificationType === 'Division'
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Division
                      </span>
                    </button>

                    <button
                      type='button'
                      onClick={() => handleButtonClick('All')}
                      className={`
                        flex-1 cursor-pointer rounded-lg border-2 p-4 text-center
                        transition-all duration-200 hover:shadow-md hover:scale-105
                        ${
                          formData.NotificationType === 'All'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-gray-200 dark:border-gray-700'
                        }
                      `}
                    >
                      <div
                        className={`
                          cursor-pointer rounded-lg p-4 text-center transition-all duration-200
                           hover:scale-105
                          ${
                            formData.NotificationType === 'All'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                              : 'border-gray-200 dark:border-gray-700'
                          }
                        `}
                      >
                        <div className='flex justify-center mb-2'>
                          <svg
                            className={`w-6 h-6 ${formData.NotificationType === 'All' ? 'text-blue-500' : 'text-gray-400'}`}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                            />
                          </svg>
                        </div>
                        <span
                          className={`font-medium ${
                            formData.NotificationType === 'All'
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          All
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className='mt-4'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'>
                    Body
                  </label>
                  <textarea
                    required
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700'
                    value={formData.body}
                    onChange={e =>
                      setFormData({ ...formData, body: e.target.value })
                    }
                    rows={6}
                  />
                </div>

                <div className='mt-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3'>
                    <button
                      type='button'
                      onClick={onClose}
                      className='w-full px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200'
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      onClick={e => handleSubmit(e, true)}
                      className='w-full px-4 py-2 text-white bg-purple-700 rounded-lg hover:bg-purple-500'
                    >
                      Save as Draft
                    </button>
                    <button
                type='submit'
                disabled={isLoading}
                className='w-full px-4 py-2 bg-[#1C6BA0] text-white rounded-lg hover:bg-[#155d8a] disabled:bg-gray-400'
              >
                {isLoading ? (editMode ? 'Updating...' : 'Creating...') : (editMode ? 'Update Workflow' : 'Create Workflow')}
              </button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className='text-center'>
            <div className='flex justify-center mb-4'>
              <BsCheckCircleFill className='text-green-500 text-4xl' />
            </div>
            <h2 className='text-xl font-bold text-gray-800 dark:text-white mb-2'>
              Workflow {editMode ? 'Updated' : 'Created'}
            </h2>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              Your workflow has been successfully {editMode ? 'updated' : 'created'}.
            </p>
            <button
              onClick={onClose}
              className='w-full px-3 py-2 bg-[#1C6BA0] text-white rounded-lg hover:bg-[#155d8a]'
            >
              Close
            </button>
          </div>
            
          )}
        </div>
      </div>
      {isSelectionModalOpen && formData.NotificationType !== 'All' && (
        <SelectionModal
          isOpen={isSelectionModalOpen}
          onClose={() => setIsSelectionModalOpen(false)}
          notificationType={formData.NotificationType}
          formData={formData}
          setFormData={setFormData}
          setUserCount={setUserCount}
          setDivisionCount={setDivisionCount}
        />
      )}
    </div>
  )
})

export default WorkflowModal;
