import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import SidebarNav from '../components/layout/SidebarNav'
import NotificationCard from '../pages/NotificationCard'
import WorkFlow from '../pages/WorkFlow'
import NotificationHistory from '../pages/NotificationHistory'
import AdminPortal from '../pages/AdminPortal'
import Dashboard from '../pages/Dashboard'
import ContactDirectory from '../pages/ContactDirectory'
import Settings from '../pages/Settings'
import NotFound from '../components/layout/404'
import ProtectedRoute from '../components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UpdatePassword from '../pages/UpdatePassword'
import ChangePassword from '../pages/ChangePassword'
import SendAlertPage from '../pages/SendAlertPage'
import ScreenShot from '../pages/ScreenShot'
import FAQPage from '../pages/Faq'
import Attendance from '../pages/Attendance'
import AttendanceReport from '../pages/AttendanceReport'
import TimeofRecord from "../pages/timeofrecord";
import TimeofHistory from "../pages/timeofhistory";


import { ThemeProvider } from  '../contexts/ThemeContext'; 

function AppRoutes() {
  return (
 
    <ThemeProvider>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<SidebarNav />}>
            <Route path='/notification' element={<NotificationCard />} />
            <Route path='/alert' element={<SendAlertPage />} />
            <Route path='/workflows' element={<WorkFlow />} />
            <Route path='/NotificationHistory' element={<NotificationHistory />} />
            <Route path='/adminPortal' element={<AdminPortal />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/contactDirectory' element={<ContactDirectory />} />
            <Route path='/screenshot' element={<ScreenShot />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/faq' element={<FAQPage />} />
            <Route path='/attendance' element={<Attendance />} />
            <Route path='/attendance/history' element={<Attendance />} />
            <Route path='/attendance/report' element={<AttendanceReport />} />
            {/* Updated Time routes to match sidebar paths */}
            <Route path="/time/record" element={<TimeofRecord />} />
            <Route path="/time/history" element={<TimeofHistory />} />
          </Route>

          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/updatePassword' element={<UpdatePassword />} />
        </Route>
      </Routes>

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
      />
    </ThemeProvider>
  )
}

export default AppRoutes