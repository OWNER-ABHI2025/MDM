import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiClock,
  FiCalendar,
  FiBarChart2,
  FiCheckSquare,
  FiDatabase,
  FiPlus,
  FiTrendingUp,
  FiX
} from 'react-icons/fi'

// Mock API functions for demo
const getDashboardData = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    data: {
      sections: {
        daily: { count: 42 },
        weekly: { count: 157 },
        monthly: { count: 623 },
        scheduled: { count: 28 },
        all_time: { count: 2847 }
      }
    }
  }
}

const getDashboardStats = async (section) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return {
    section,
    details: {
      total_acknowledgements: Math.floor(Math.random() * 1000) + 100,
      success_rate: Math.floor(Math.random() * 30) + 70,
      failed_rate: Math.floor(Math.random() * 30) + 5
    }
  }
}

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
        >
          <FiX className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  )
}

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState([
    { label: 'Run this month', value: 0, view: 'View', section: 'monthly' },
    { label: 'Scheduled', value: 0, view: 'View', section: 'scheduled' },
    { label: 'All Time', value: 0, view: 'All Time', section: 'all_time' },
    { label: 'Monthly', value: 0, view: 'View', section: 'monthly' },
    { label: 'Weekly', value: 0, view: 'All Time', section: 'weekly' },
  ])

  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0, 0])
  const [showModal, setShowModal] = useState(false)
  const [modalSection, setModalSection] = useState('monthly')
  const [modalData, setModalData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchModalData = async () => {
      try {
        const data = await getDashboardStats(modalSection)
        setModalData(data)
      } catch (error) {
        console.error('Error fetching modal data:', error)
        setModalData(null)
      }
    }

    if (showModal) {
      fetchModalData()
    }
  }, [modalSection, showModal])

  const startAnimation = useCallback(
    metricsData => {
      const animationDuration = 2000
      const steps = 60
      const interval = animationDuration / steps

      metricsData.forEach((metric, index) => {
        const increment = metric.value / steps
        let currentStep = 0

        const timer = setInterval(() => {
          if (currentStep < steps) {
            setAnimatedValues(prev => {
              const newValues = [...prev]
              newValues[index] = Math.round(increment * currentStep)
              return newValues
            })
            currentStep++
          } else {
            setAnimatedValues(prev => {
              const newValues = [...prev]
              newValues[index] = metric.value
              return newValues
            })
            clearInterval(timer)
          }
        }, interval)
      })
    },
    [setAnimatedValues]
  )

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await getDashboardData()
      const newMetrics = [
        {
          label: 'Daily Stats',
          value: data.sections.daily.count,
          view: 'View',
          section: 'daily',
          icon: FiClock,
          trend: '+12%',
          description: 'Tasks completed today'
        },
        {
          label: 'Weekly Stats',
          value: data.sections.weekly.count,
          view: 'View',
          section: 'weekly',
          icon: FiCalendar,
          trend: '+8%',
          description: 'This week\'s progress'
        },
        {
          label: 'Monthly Stats',
          value: data.sections.monthly.count,
          view: 'View',
          section: 'monthly',
          icon: FiBarChart2,
          trend: '+15%',
          description: 'Monthly achievements'
        },
        {
          label: 'Scheduled Tasks',
          value: data.sections.scheduled.count,
          view: 'View',
          section: 'scheduled',
          icon: FiCheckSquare,
          trend: '+5%',
          description: 'Pending workflows'
        },
        {
          label: 'All Time Stats',
          value: data.sections.all_time.count,
          view: 'View',
          section: 'all_time',
          icon: FiDatabase,
          trend: '+23%',
          description: 'Total completions'
        },
      ]
      setMetrics(newMetrics)
      startAnimation(newMetrics)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [setMetrics, startAnimation])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const handleCreateWorkflow = () => {
    navigate('/screenshot')
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100'>
      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes pulseSubtle {
            0% { opacity: 1; }
            50% { opacity: 0.85; }
            100% { opacity: 1; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          
          .animate-slide-up {
            animation: slideUp 0.8s ease-out forwards;
          }
          
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }
          
          .animate-pulse-subtle {
            animation: pulseSubtle 3s infinite;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 1000px 100%;
            animation: shimmer 2s infinite;
          }
          
          .dark .shimmer {
            background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
            background-size: 1000px 100%;
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .dark .glass-effect {
            background: rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}
      </style>

      <div className='w-full h-full min-h-screen flex flex-col'>
        {/* Header Section */}
        <div className='relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-[#1C6BA0]/5 to-transparent'></div>
          <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div className='animate-fade-in'>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
                  Welcome back, Admin
                </h1>
                <p className='text-lg text-gray-600 dark:text-gray-400 mt-2'>
                  Here's what's happening with your workflows today
                </p>
              </div>
              <div className='animate-float'>
                <div className='flex items-center space-x-2 text-[#1C6BA0] bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm'>
                  <FiTrendingUp className='w-5 h-5' />
                  <span className='text-sm font-medium'>Performance Up 15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className='flex-1 px-4 sm:px-6 lg:px-8 pb-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
            {metrics.map((metric, index) => (
              <div
                key={index}
                className='group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl 
                          border border-gray-200/50 dark:border-gray-700/50 
                          shadow-lg hover:shadow-2xl transition-all duration-500 ease-out
                          p-6 transform hover:scale-[1.02] hover:-translate-y-1
                          animate-slide-up min-h-[200px] relative overflow-hidden'
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Subtle background pattern */}
                <div className='absolute inset-0 bg-gradient-to-br from-[#1C6BA0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                
                {/* Loading state */}
                {isLoading ? (
                  <div className='h-full flex flex-col justify-center'>
                    <div className='shimmer h-6 rounded mb-4'></div>
                    <div className='shimmer h-16 rounded mb-4'></div>
                    <div className='shimmer h-4 rounded'></div>
                  </div>
                ) : (
                  <div className='h-full flex flex-col justify-between relative z-10'>
                    {/* Header */}
                    <div className='flex justify-between items-start mb-4'>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1'>
                          {metric.label}
                        </h3>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          {metric.description}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setShowModal(true)
                          setModalSection(metric.section)
                        }}
                        className='text-sm font-medium text-[#1C6BA0] hover:text-blue-700 
                                 bg-[#1C6BA0]/10 hover:bg-[#1C6BA0]/20 
                                 px-3 py-1.5 rounded-lg transition-all duration-200
                                 border border-[#1C6BA0]/20 hover:border-[#1C6BA0]/40'
                      >
                        {metric.view}
                      </button>
                    </div>

                    {/* Main Content */}
                    <div className='flex items-end justify-between mt-auto'>
                      <div className='flex flex-col'>
                        <span className='text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1C6BA0] animate-pulse-subtle leading-none'>
                          {animatedValues[index]?.toLocaleString() || 0}
                        </span>
                        {metric.trend && (
                          <div className='flex items-center mt-2 text-green-600 dark:text-green-400'>
                            <FiTrendingUp className='w-4 h-4 mr-1' />
                            <span className='text-sm font-medium'>{metric.trend}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Icon */}
                      <div className='flex items-center justify-center w-16 h-16 bg-[#1C6BA0]/10 rounded-2xl group-hover:bg-[#1C6BA0]/20 transition-colors duration-300'>
                        {metric.icon && (
                          <metric.icon className='w-8 h-8 text-[#1C6BA0] group-hover:scale-110 transition-transform duration-300' />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
                    {/* Create Workflow Card */}
            <div
              className='group bg-gradient-to-br from-[#1C6BA0]/10 to-[#1C6BA0]/5 
                         border-2 border-dashed border-[#1C6BA0]/30 hover:border-[#1C6BA0]/60
                         rounded-2xl transition-all duration-500 ease-out
                         p-6 transform hover:scale-[1.02] hover:-translate-y-1
                         animate-slide-up min-h-[200px] cursor-pointer
                         relative overflow-hidden'
              style={{
                animationDelay: `${metrics.length * 100}ms`,
              }}
              onClick={handleCreateWorkflow}
            >
              <div className='absolute inset-0 bg-gradient-to-br from-[#1C6BA0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
              
              <div className='h-full flex flex-col justify-center items-center text-center relative z-10'>
                <div
                  className='w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300'
                  onClick={e => { e.stopPropagation(); handleCreateWorkflow(); }}
                  style={{ cursor: 'pointer' }}
                >
                  <FiPlus className='w-10 h-10 text-[#1C6BA0] group-hover:rotate-90 transition-transform duration-300' />
                </div>
                
                <h3 className='text-xl font-bold text-[#1C6BA0] mb-2'>
                  Create Workflow
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs'>
                  Start a new workflow or capture a screenshot to streamline your processes
                </p>
                
                <div
                  className='mt-4 px-4 py-2 bg-[#1C6BA0]/20 rounded-lg text-sm font-medium text-[#1C6BA0] group-hover:bg-[#1C6BA0]/30 transition-colors duration-300'
                  onClick={e => { e.stopPropagation(); handleCreateWorkflow(); }}
                  style={{ cursor: 'pointer' }}
                >
                  Get Started
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalData ? (
          <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl p-8 shadow-2xl max-w-lg w-full border border-gray-700/50 relative overflow-hidden'>
            {/* Background decoration */}
            <div className='absolute inset-0 bg-gradient-to-br from-[#1C6BA0]/10 to-transparent'></div>
            
            <div className='relative z-10'>
              {/* Header */}
              <div className='mb-8'>
                <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2'>
                  {modalData.section.charAt(0).toUpperCase() + modalData.section.slice(1)} Statistics
                </h2>
                <p className='text-gray-400'>Detailed performance metrics</p>
              </div>

              {/* Stats Grid */}
              <div className='space-y-6'>
                {/* Total Acknowledgements */}
                <div className='bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <span className='text-gray-400 text-sm'>Total Acknowledgements</span>
                      <div className='text-2xl font-bold text-blue-400 mt-1'>
                        {modalData.details.total_acknowledgements.toLocaleString()}
                      </div>
                    </div>
                    <div className='w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300'>
                      <FiDatabase className='w-6 h-6 text-blue-400' />
                    </div>
                  </div>
                </div>

                {/* Success/Failure Rates */}
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 group'>
                    <div className='text-center'>
                      <span className='text-gray-400 text-sm block mb-2'>Success Rate</span>
                      <div className='text-2xl font-bold text-green-400 mb-1'>
                        {modalData.details.success_rate}%
                      </div>
                      <div className='w-full bg-gray-700 rounded-full h-2'>
                        <div 
                          className='bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000'
                          style={{ width: `${modalData.details.success_rate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className='bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 group'>
                    <div className='text-center'>
                      <span className='text-gray-400 text-sm block mb-2'>Failed Rate</span>
                      <div className='text-2xl font-bold text-red-400 mb-1'>
                        {modalData.details.failed_rate}%
                      </div>
                      <div className='w-full bg-gray-700 rounded-full h-2'>
                        <div 
                          className='bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full transition-all duration-1000'
                          style={{ width: `${modalData.details.failed_rate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overall Progress Bar */}
                <div className='bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50'>
                  <div className='flex justify-between items-center mb-3'>
                    <span className='text-gray-400 text-sm'>Overall Performance</span>
                    <span className='text-white font-semibold'>{modalData.details.success_rate}%</span>
                  </div>
                  <div className='h-3 w-full bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-gradient-to-r from-green-400 via-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out'
                      style={{ width: `${modalData.details.success_rate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='bg-gray-900/95 backdrop-blur-sm text-white p-8 rounded-2xl flex items-center justify-center border border-gray-700/50'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C6BA0] mx-auto mb-4'></div>
              <span className='text-lg'>Loading statistics...</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default DashboardMetrics