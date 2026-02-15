import { useState, useEffect } from 'react'
import { Carousel } from '../components/WorkFlow/Carousel'
import { DataTable } from '../components/WorkFlow/DataTable'
import { SearchBar } from '../components/WorkFlow/SearchBar'
import WorkflowModal from '../components/WorkFlow/WorkflowModal'
import { CiBookmarkPlus } from 'react-icons/ci'

const Workflow = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tableUpdate, setTableUpdate] = useState(false)
  const [cardData,setCardData] = useState([])
  const [selectedCardForEdit, setSelectedCardForEdit] = useState(null)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div className='w-full min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-6'>
          <Carousel cardData={cardData} setSelectedCardForEdit={setSelectedCardForEdit}/>
        </div>
        <div className='flex justify-between items-center mb-4'>
          <p className='text-base sm:text-lg font-semibold'>
            Existing Workflow
          </p>
          <button
            onClick={handleOpenModal}
            className='inline-flex items-center px-4 py-2 bg-[#1C6BA0] hover:bg-[#15557e] text-white rounded-lg transition-colors duration-200 ease-in-out'
          >
            <CiBookmarkPlus className='h-5 w-5 mr-2' />
            <span>Add Workflow</span>
          </button>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
          <div className='px-6 py-4'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                Workflow Details
              </h2>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isSearchFocused={isSearchFocused}
                setIsSearchFocused={setIsSearchFocused}
              />
            </div>
          </div>

          <div className='px-6 pb-6'>
            <div className='overflow-x-auto'>
              <DataTable searchTerm={searchTerm} tableUpdate={tableUpdate} setCardData={setCardData} 
              setSelectedCardForEdit={setSelectedCardForEdit}
              />
            </div>
          </div>
        </div>

        {isModalOpen && (
          <WorkflowModal
            onClose={() => setIsModalOpen(false)}
            setTableUpdate={setTableUpdate}
            selectedCardForEdit={selectedCardForEdit}
          />
        )}
      </div>
    </div>
  )
}

export default Workflow
