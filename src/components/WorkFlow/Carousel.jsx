import { useState, useEffect } from 'react'
import Frame313 from '../../assets/Frame313.png'
import { IoMdTime } from 'react-icons/io'
import { CiCalendarDate } from 'react-icons/ci'
import { MdEdit } from 'react-icons/md'
import WorkflowModal from './WorkflowModal'

export const Carousel = ({ cardData }) => {
  const [startIndex, setStartIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [cardsPerPage, setCardsPerPage] = useState(4)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(2)
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(3)
      } else {
        setCardsPerPage(4)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, cardData.length - cardsPerPage)

  const handlePrevious = () => {
    if (isTransitioning || startIndex === 0) return
    setIsTransitioning(true)
    setStartIndex(prev => Math.max(0, prev - 1))
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const handleNext = () => {
    if (isTransitioning || startIndex >= maxIndex) return
    setIsTransitioning(true)
    setStartIndex(prev => Math.min(maxIndex, prev + 1))
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const formatScheduleDateTime = scheduleTime => {
    if (!scheduleTime) return { date: '-', time: '-' }

    const utcDate = new Date(scheduleTime)

    const formattedDate = utcDate.toLocaleString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Kolkata',
    })

    const formattedTime = utcDate.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    })

    return {
      date: formattedDate,
      time: formattedTime,
    }
  }

  const isWorkflowEditable = cardData => {
    return cardData.published === false || cardData.status === 'draft'
  }

  const handleEdit = card => {
    setIsEditModalOpen(true)
    setSelectedWorkflow(card)
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-3 sm:mb-4'>
        <p className='text-base sm:text-lg font-semibold'>Schedule Workflow</p>
        <div className='flex gap-1 sm:gap-2'>
          <button
            className={`p-1 sm:p-1.5 rounded-full transition-all duration-300 ${
              startIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
            }`}
            onClick={handlePrevious}
            disabled={startIndex === 0}
          >
            <svg
              className='w-3.5 h-3.5 sm:w-4 sm:h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <button
            className={`p-1 sm:p-1.5 rounded-full transition-all duration-300 ${
              startIndex >= maxIndex
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
            }`}
            onClick={handleNext}
            disabled={startIndex >= maxIndex}
          >
            <svg
              className='w-3.5 h-3.5 sm:w-4 sm:h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
      </div>

      <div className='overflow-hidden'>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{
            transform: `translateX(-${startIndex * (100 / cardsPerPage)}%)`,
          }}
        >
          {cardData.map((workflow, index) => {
            const { date, time } = formatScheduleDateTime(
             new Date(workflow.schedule_time).toLocaleString()
            )
            return (
              <div
                key={workflow.workflow_id}
                className='min-w-[50%] md:min-w-[33.333%] lg:min-w-[25%] px-1 sm:px-2'
              >
                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group h-48 sm:h-56 flex flex-col justify-between relative'>
                  <div className='flex justify-between items-start w-full'>
                    <div className='flex-1'>
                      <p className='text-sm sm:text-base font-semibold'>
                        {workflow.name}
                      </p>
                    </div>
                    <div className='ml-2'>
                      <span className='text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                        {workflow.notification_type}
                      </span>
                    </div>
                  </div>

                  <div className='flex justify-between items-end'>
                    <div className='flex flex-col space-y-2'>
                      <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1'>
                        Schedule
                      </p>
                      <div className='flex items-center space-x-2'>
                        <CiCalendarDate className='text-gray-500 w-4 h-4 sm:w-5 sm:h-5 dark:text-white' />
                        <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                          {date}
                        </p>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <IoMdTime className='text-gray-500 w-4 h-4 sm:w-5 sm:h-5 dark:text-white' />
                        <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                          {time}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center'>
                      {isWorkflowEditable(workflow) && (
                        <button onClick={() => handleEdit(workflow)}>
                          <div className='p-2 rounded-full bg-[#1C6BA0] hover:bg-[#1C6BA0]/90 transition-colors duration-300 cursor-pointer'>
                            <MdEdit className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {isEditModalOpen && selectedWorkflow && (
          <WorkflowModal
            onClose={() => setIsEditModalOpen(false)}
            editMode={true}
            initialData={selectedWorkflow}
          />
        )}
      </div>
    </div>
  )
}
