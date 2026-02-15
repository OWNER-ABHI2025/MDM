import { useState } from 'react'
import { BiSolidDashboard } from 'react-icons/bi'
import { GoWorkflow } from 'react-icons/go'
import { useSidebar } from '../../contexts/SidebarContext'
import { MdContacts } from 'react-icons/md'
import { IoMdSettings } from 'react-icons/io'
import { AiOutlineNotification } from 'react-icons/ai'
import { FaHistory } from 'react-icons/fa'
import { MdOutlineLogout } from 'react-icons/md'
import { RiQuestionAnswerLine, RiScreenshot2Fill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../apis/authAPI'
import { toast } from 'react-toastify';
import { FaBell } from "react-icons/fa";
import { MdScreenshotMonitor } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import LogoutModal from '../Logout'
import { MdOutlineAssignment } from "react-icons/md";
import { MdAccessTime } from "react-icons/md"; // Icon for Time Off dropdown
import { IoDocumentTextOutline } from "react-icons/io5"; // Icon for Time Off Record

const Sidebar = () => {
  const { isCollapsed, setActiveTab } = useSidebar()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [screenshotOpen, setScreenshotOpen] = useState(false)
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [timeOffOpen, setTimeOffOpen] = useState(false);


  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      toast.info('Logged out successfully.');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <aside
        id='logo-sidebar'
        className={`fixed top-0 left-0 z-40 w-64 min-h-dvh transition-transform duration-700 shadow-md border-r bg-[#0D2C49] dark:bg-gray-900 dark:border-gray-700 dark:shadow-gray-800 text-gray-100 ${isCollapsed ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label='Sidebar'
      >
        <div className='px-3 pb-4 overflow-y-auto flex flex-col min-h-dvh pt-24 justify-between'>
          <ul className='space-y-2 font-medium'>
            <li>
              <Link
                to='/dashboard'
                className='flex items-center p-2 rounded-lg hover:bg-[#19446c]'
                onClick={() => setActiveTab('dashboard')}
              >
                <BiSolidDashboard fontSize={'1.5rem'} />
                <span className='ms-3'>Dashboard</span>
              </Link>
            </li>
            {/* Screenshot menu */}
            <li>
              <span
                className='flex items-center justify-between p-2 rounded-lg hover:bg-[#19446c] cursor-pointer'
                onClick={() => setScreenshotOpen(!screenshotOpen)}
              >
                <div className='flex items-center'>
                  <MdScreenshotMonitor fontSize={'1.5rem'} />
                  <span className='ms-3'>Screenshot</span>
                </div>
                <div className={`${screenshotOpen ? 'rotate-90' : 'rotate-0'} transition-transform duration-300 ease-in`}>  
                  <MdKeyboardArrowRight size={'1.5rem'} />
                </div>
              </span>
              <ul className={`pl-6 space-y-2 transition-all duration-500 ease-in ${screenshotOpen ? 'block' : 'hidden'}`}>
                <li>
                  <Link
                    to='/screenshot'
                    className='flex items-center p-2 rounded-lg hover:bg-[#19446c] group'
                    onClick={() => setActiveTab('screenshot')}
                  >
                    <RiScreenshot2Fill fontSize={'1.5rem'} />
                    <span className='flex-1 ms-3 whitespace-nowrap'>
                      Screen Shots
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            {/* Attendance menu */}
            <li>
              <span
                className='flex items-center justify-between p-2 rounded-lg hover:bg-[#19446c] cursor-pointer'
                onClick={() => setAttendanceOpen(!attendanceOpen)}
              >
                <div className='flex items-center'>
                  <MdOutlineAssignment fontSize={'1.5rem'} />
                  <span className='ms-3'>Attendance</span>
                </div>
                <div className={`${attendanceOpen ? 'rotate-90' : 'rotate-0'} transition-transform duration-300 ease-in`}>
                  <MdKeyboardArrowRight size={'1.5rem'} />
                </div>
              </span>
              <ul className={`pl-6 space-y-2 transition-all duration-500 ease-in ${attendanceOpen ? 'block' : 'hidden'}`}>
                <li>
                  <Link
                    to='/attendance/history'
                    className='flex items-center p-2 rounded-lg hover:bg-[#19446c] group'
                    onClick={() => setActiveTab('attendanceHistory')}
                  >
                    <MdContacts fontSize={'1.3rem'} />
                    <span className='flex-1 ms-3 whitespace-nowrap'>Attendance History</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='/attendance/report'
                    className='flex items-center p-2 rounded-lg hover:bg-[#19446c] group'
                    onClick={() => setActiveTab('attendanceReport')}
                  >
                    <MdOutlineAssignment fontSize={'1.3rem'} />
                    <span className='flex-1 ms-3 whitespace-nowrap'>Attendance Report</span>
                  </Link>
                </li>
              </ul>
            </li>
            {/* Time Off menu - New dropdown */}
            <li>
              <span
                className='flex items-center justify-between p-2 rounded-lg hover:bg-[#19446c] cursor-pointer'
                onClick={() => setTimeOffOpen(!timeOffOpen)}
              >
                <div className='flex items-center'>
                  <MdAccessTime fontSize={'1.5rem'} />
                  <span className='ms-3'>Time Off</span>
                </div>
                <div className={`${timeOffOpen ? 'rotate-90' : 'rotate-0'} transition-transform duration-300 ease-in`}>
                  <MdKeyboardArrowRight size={'1.5rem'} />
                </div>
              </span>
              <ul className={`pl-6 space-y-2 transition-all duration-500 ease-in ${timeOffOpen ? 'block' : 'hidden'}`}>
                <li>
                  <Link
                    to='/time/history'
                    className='flex items-center p-2 rounded-lg hover:bg-[#19446c] group'
                    onClick={() => setActiveTab('timeOffHistory')}
                  >
                    <FaHistory fontSize={'1.3rem'} />
                    <span className='flex-1 ms-3 whitespace-nowrap'>Time Off History</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='/time/record'
                    className='flex items-center p-2 rounded-lg hover:bg-[#19446c] group'
                    onClick={() => setActiveTab('timeOffRecord')}
                  >
                    <IoDocumentTextOutline fontSize={'1.3rem'} />
                    <span className='flex-1 ms-3 whitespace-nowrap'>Time Off Record</span>
                  </Link>
                </li>
              </ul>
            </li>
            {/* Contact Directory and Settings follow */}
            <li>
              <Link
                to='/contactDirectory'
                className='flex items-center p-2 rounded-lg hover:bg-[#19446c] group'
                onClick={() => setActiveTab('contactDirectory')}
              >
                <MdContacts fontSize={'1.5rem'} />
                <span className='flex-1 ms-3 whitespace-nowrap'>
                  Contact Directory
                </span>
              </Link>
            </li>
            <li>
              <Link
                to='/settings'
                className='flex items-center p-2 rounded-lg hover:bg-[#19446c] group'
                onClick={() => setActiveTab('settings')}
              >
                <IoMdSettings fontSize={'1.5rem'} />
                <span className='flex-1 ms-3 whitespace-nowrap'>Settings</span>
              </Link>
            </li>
          </ul>
          <ul className='space-y-2 font-medium'>
            <li>
              <span
                to='/logout'
                className='flex items-center p-2 rounded-lg hover:bg-[#19446c] group hover:cursor-pointer'
                onClick={handleLogout}
              >
                <MdOutlineLogout fontSize={'1.5rem'} />
                <span className='flex-1 ms-3 whitespace-nowrap'>Logout</span>
              </span>
            </li>
            <li>
              <Link
                to='/faq'
                className='flex items-center p-2 rounded-lg hover:bg-[#19446c] group hover:cursor-pointer'
                onClick={() => setActiveTab('FAQ')}
              >
                <RiQuestionAnswerLine fontSize={'1.5rem'} />
                <span className='flex-1 ms-3 whitespace-nowrap'>FAQ</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  )
}

export default Sidebar