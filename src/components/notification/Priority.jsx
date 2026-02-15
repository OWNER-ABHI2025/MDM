import { useNotification } from "../../contexts/NotifcationContext";

const Priority = () => {
  const { selectedPriority, setSelectedPriority } = useNotification()

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };

  return (
    <div className='bg-[#0D2C49] text-gray-100 shadow-lg rounded-lg p-6 w-full h-full'>
      <h2 className='text-xl font-normal mb-4 px-4'>Select priority</h2>
      <div className='flex flex-col justify-around px-2 rounded-lg space-y-4'>
        <label className='flex items-center space-x-2'>
          <input
            type='radio'
            name='priority'
            value='High'
            className='hidden peer'
            onChange={handlePriorityChange}
            checked={selectedPriority === 'High'}
          />
          <span className='w-5 h-5 rounded-full border-4 border-red-500 peer-checked:bg-white'></span>
          <span>High</span>
        </label>

        <label className='flex items-center space-x-2'>
          <input
            type='radio'
            name='priority'
            value='Medium'
            className='hidden peer'
            onChange={handlePriorityChange}
            checked={selectedPriority === 'Medium'}
          />
          <span className='w-5 h-5 rounded-full border-4 border-yellow-500 peer-checked:bg-white'></span>
          <span>Medium</span>
        </label>

        <label className='flex items-center space-x-2'>
          <input
            type='radio'
            name='priority'
            value='Low'
            className='hidden peer'
            onChange={handlePriorityChange}
            checked={selectedPriority === 'Low'}
          />
          <span className='w-5 h-5 rounded-full border-4 border-green-500 peer-checked:bg-white'></span>
          <span>Low</span>
        </label>
      </div>

      <div className='mt-5'>
        <p>Selected Priority: <strong className={selectedPriority === 'High' ? 'text-red-500' : selectedPriority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}>{selectedPriority || 'None'}</strong></p>
      </div>
    </div>
  );
};

export default Priority;