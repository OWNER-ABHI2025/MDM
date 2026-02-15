import React, { useState, useEffect, useMemo } from 'react'
import { FaUser, FaUsers, FaGlobe } from 'react-icons/fa'
import { getAllDevices } from '../apis/devicesAPI'
import { getAllGroups } from '../apis/groupsAPI'
import globe from '../assets/subway_world.png'
import ScreenshotTable from '../components/screenShot/ScreenshotTable'
import ScreenshotModal from '../components/screenShot/ScreenshotModal'
import { getScreenshotHistory } from '../apis/screenShots'
import ScreenshotHistoryTable from '../components/screenShot/ScreenshotHistoryTable'

const Screenshot = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const [devices, setDevices] = useState([])
  const [groups, setGroups] = useState([])
  const [screenshots, setScreenshots] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (modalOpen) {
        setIsLoading(true)
        try {
          if (selectedType === 'single') {
            const deviceData = await getAllDevices()
            setDevices(deviceData)
          } else if (selectedType === 'multiple') {
            const groupData = await getAllGroups()
            setGroups(groupData)
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchData()
  }, [modalOpen, selectedType])

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
  }, [])

  const handleCardClick = type => {
    setSelectedType(type)
    setModalOpen(true)
  }

  const cards = useMemo(
    () => [
      {
        type: 'single',
        icon: <FaUser className='text-3xl sm:text-4xl md:text-5xl mb-4' />,
        title: 'Single',
      },
      {
        type: 'multiple',
        icon: <FaUsers className='text-3xl sm:text-4xl md:text-5xl mb-4' />,
        title: 'Multiple',
      },
      {
        type: 'all',
        icon: (
          <img
            src={globe}
            alt='Globe'
            className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-4 filter brightness-0 invert'
          />
        ),
        title: 'All',
      },
    ],
    []
  )

  return (
    <div className='flex flex-col min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-200 px-4 sm:px-6'>
      
      {/* heading */}
      <div className='w-full pt-4 pb-8'>
        <div className='container mx-auto'>
          <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-[#1C6BA0] dark:text-[#4FA8E0] text-center transition-colors'>
            Screenshot Management
          </h1>
          <p className='text-center text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2 transition-colors'>
            Select a type to take a Screenshot
          </p>
        </div>
      </div>

      {/* cards */}
      <div className='w-full flex justify-center items-center mb-8 md:mt-6 lg:mt-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl'>
          {cards.map(card => (
            <div
              key={card.type}
              onClick={() => handleCardClick(card.type)}
              className='flex flex-col items-center justify-center h-[180px] sm:h-[200px] md:h-[220px] 
                bg-[#0D2C49] dark:bg-[#1a3c5f] text-white rounded-2xl shadow-lg 
                hover:shadow-xl cursor-pointer transition-all duration-300 transform 
                hover:scale-95 hover:bg-[#164875] dark:hover:bg-[#234b77]'
            >
              {card.icon}
              <span className='font-medium text-base sm:text-lg md:text-xl'>
                {card.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ScreenshotModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={selectedType}
        devices={devices}
        groups={groups}
        onSuccess={updateTableData}
      />

      {/* history table */}
      <ScreenshotTable/>
    </div>
  )
}

export default Screenshot
