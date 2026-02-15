import { useNotification } from '../../contexts/NotifcationContext'
import GroupSelector from './GroupSelector'
import Modal from './Modal'
import UserSelector from './UserSelector'

const Device = () => {
  const {
    selectedDevice,
    setSelectedDevice,
    showUserSelector,
    setShowUserSelector,
    selectedUser,
    setSelectedUser,
    showGroupSelector,
    setShowGroupSelector,
    selectedGroup,
    setSelectedGroup,
  } = useNotification();

  const handleDeviceChange = (device) => {

    setSelectedDevice(device);

    if (device === 'User') {
      setShowUserSelector(true);
      setShowGroupSelector(false);
      setSelectedGroup(null)
    } else if (device === 'Division') {
      setShowGroupSelector(true);
      setShowUserSelector(false);
      setSelectedUser(null)
    } else {
      setShowUserSelector(false);
      setShowGroupSelector(false);
      setSelectedUser(null)
      setSelectedGroup(null)
    }
  };

  return (
    <div className="bg-[#0D2C49] text-gray-100 shadow-lg rounded-lg p-6 w-full h-full">
      <h2 className="text-xl font-normal mb-4 px-4">Select device</h2>
      <div className="flex flex-col justify-around px-2 rounded-lg space-y-3">
        {['User', 'Division', 'All'].map((device) => (
          <div
            key={device}
            onClick={() => handleDeviceChange(device)}
            className={`cursor-pointer px-4 py-2 w-40 rounded-full border-2 ${
              selectedDevice === device
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-500 bg-[#0D2C49] text-gray-300'
            } hover:border-blue-400 hover:bg-blue-600 transition-all duration-200`}
          >
            {device}
          </div>
        ))}
      </div>

      <Modal
        isOpen={showGroupSelector}
        onClose={() => setShowGroupSelector(false)}
      >
        <GroupSelector />
      </Modal>

      <Modal
        isOpen={showUserSelector}
        onClose={() => setShowUserSelector(false)}
      >
        <UserSelector />
      </Modal>

      <div className="mt-4">
        {selectedDevice === 'User' && selectedUser?.length > 0 && (
          <p>
            Selected User: <strong>{selectedUser.map((user) => user.name).join(', ')}</strong>
          </p>
        )}

        {selectedDevice === 'Division' && selectedGroup?.length > 0 && (
          <p>
            Selected Division: <strong>{selectedGroup.map((group) => group.name).join(', ')}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Device;
