import Message from '../components/notification/Message'
import Priority from '../components/notification/Priority'
import Button from '../components/notification/Button'
import Device from '../components/notification/Device.jsx'
import Name from '../components/notification/Name.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNotification } from '../contexts/NotifcationContext.jsx'
import { createNotification } from '../apis/notificationAPI.js'


const NotificationCard = () => {

  const {
    message,
    workflowName,
    setMessage,
    selectedPriority,
    selectedDevice,
    selectedUser,
    selectedGroup,
  } = useNotification()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const name = workflowName?.trim()

    const body = message?.trim()
    
    const priority = selectedPriority === 'High' ? 1 : selectedPriority === 'Medium' ? 2 : selectedPriority === 'Low' ? 3 : 1
    
    const users = selectedUser?.map(user => user.id)
    const divisions = selectedGroup?.map(group => group.id)
    const ids = selectedDevice === 'User' ? users : selectedDevice === 'Division' ? divisions : []

    const NotificationType = selectedDevice

    const status = 'live'

    const WorkflowType = 'immediate'
    
    const data = {
      body,
      name,
      priority,
      ids,
      status,
      NotificationType,
      WorkflowType,
    }

    try {
      await createNotification(data)
      setMessage('')
      toast.success('Message sent successfully.');
    } catch {
      toast.error('Error sending notification')
    }
  }

  return (
    <div className='flex items-center justify-center max-w-5xl w-full mx-2 space-y-2'>
      <form onSubmit={handleSubmit} className='w-full'>
      <div className='flex flex-col items-center p-2 overflow-y-hidden max-w-5xl w-full mx-2 space-y-2'>
        <Name />
        <Message />

        <div className='flex flex-col lg:flex-row w-full gap-x-2 gap-y-2'>
          <div className='flex-1'>
            <Priority />
          </div>
          <div className='flex-1'>
            <Device />
          </div>
        </div>
        <Button />
      </div>
    </form>
    </div>
  )
}

export default NotificationCard


