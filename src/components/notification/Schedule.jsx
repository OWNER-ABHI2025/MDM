import DateSelector from './DateSelector'
import TimeSelector from './TimeSelector'
import { useNotification } from '../../contexts/NotifcationContext'

const Schedule = () => {
  const { scheduleType, setScheduleType } = useNotification()

  return (
    <div className='bg-[#0D2C49] text-gray-100 shadow-lg rounded-lg p-6 w-full h-full'>
      <div className='flex flex-col h-full'>

        <div className='flex flex-col space-y-4'>
          <h2 className='text-xl font-normal'>Select Schedule or Instant</h2>

          <div className='relative w-52'>
            <select
              value={scheduleType}
              onChange={e => setScheduleType(e.target.value)}
              className='w-full h-12 px-4 bg-transparent border border-white rounded-lg 
                          appearance-none cursor-pointer focus:outline-none focus:border-blue-500
                          transition-all duration-300'
            >
              <option value='immediate' className='bg-[#20315C]'>
                Instant
              </option>
              <option value='scheduled' className='bg-[#20315C]'>
                Scheduled
              </option>
            </select>

            <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
              <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='flex-grow mt-6'>
          {scheduleType === 'immediate' && (
            <div className='flex items-center gap-2 text-gray-300 animate-fadeIn'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                />
              </svg>
              <span>This message will be sent instantly</span>
            </div>
          )}

          {scheduleType === 'scheduled' && (
            <div className='flex flex-col sm:flex-row gap-4 animate-slideDown'>
              <div
                className='h-12 w-full sm:w-52 flex items-center justify-evenly 
                border border-white rounded-lg overflow-hidden 
               hover:border-blue-500 transition-colors duration-300'
              >
                <TimeSelector />
              </div>

              <div
                className='h-12 w-full sm:w-52 flex items-center justify-evenly 
                border border-white rounded-lg overflow-hidden
              hover:border-blue-500 transition-colors duration-300'
              >
                <DateSelector />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Schedule