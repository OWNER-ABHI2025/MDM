import { useNotification } from "../../contexts/NotifcationContext"

const Message = () => {
  const {message, setMessage} = useNotification()

  return (
    <div className='bg-[#0D2C49] text-gray-100 shadow-lg rounded-lg p-6 w-full'>
      <h2 className='text-xl font-normal mb-2 px-4'>Alert message</h2>
      <div>
        <div className='mb-2'>
          <textarea
            id='notification'
            placeholder='Type your message here ...'
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            className='w-full px-4 pb-4 bg-inherit font-normal placeholder-gray-300 text-md focus:outline-none'
            rows='3'
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default Message
