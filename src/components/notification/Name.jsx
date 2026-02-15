import { useNotification } from "../../contexts/NotifcationContext"

const Name = () => {
  const {workflowName, setWorkflowName} = useNotification()

  return (
    <div className='bg-[#0D2C49] text-gray-100 shadow-lg rounded-lg p-6 w-full flex items-center'>
      <h2 className='text-xl font-normal p-4 w-52'>Workflow Name</h2>
      <div className="w-full">
        <div>
          <input
            id='notification'
            type="text"
            placeholder='Enter here ...'
            value={workflowName}
            onChange={e => setWorkflowName(e.target.value)}
            required
            className='w-full p-4 bg-inherit font-normal bg-[#195084] placeholder-gray-400 placeholder:text-xl text-xl rounded-2xl focus:outline-none'
          />
        </div>
      </div>
    </div>
  )
}

export default Name
