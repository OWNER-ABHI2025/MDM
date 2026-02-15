import { useEffect, useState } from 'react';
import { useNotification } from '../../contexts/NotifcationContext';
import { createGroup, getUnassignedDevices } from '../../apis/groupsAPI';
import { IoIosSearch } from "react-icons/io";
import { LuCheck } from "react-icons/lu";


const CreateGroup = () => {
  const { setShowCreateGroup } = useNotification();

  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [unassignedUsers, setUnassignedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUnassignedDevices();
      setUnassignedUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const filteredUsers = unassignedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      const validPrevSelectedUsers = Array.isArray(prevSelectedUsers) ? prevSelectedUsers : [];

      if (validPrevSelectedUsers.some((selected) => selected.id === user.id)) {
        return validPrevSelectedUsers.filter((selected) => selected.id !== user.id);
      }
      return [...validPrevSelectedUsers, user];
    });
  };

  const handleCreateGroup = async () => {
    await createGroup({
      Division_name: groupName,
      device_ids: selectedUsers.map(user => user.id),
    });

    setShowCreateGroup(false);
  };

  return (
    <div className="bg-[#0D2C49] text-gray-100 shadow-lg rounded-lg p-6 w-full">
      <h2 className="text-xl font-medium mx-4 pb-8">Create a New Division</h2>

      <div className="flex w-full">
      <input
        type="text"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        placeholder="Enter Division Name"
        className="w-full bg-inherit border placeholder:text-gray-300 border-gray-300 rounded-lg mx-4 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
      </div>

      <div className="relative flex w-full">
        <IoIosSearch
          className="absolute left-6 top-1/3 -translate-y-1/3 text-gray-200"
          size={'1.2rem'}
        />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full bg-inherit border placeholder:text-gray-400 border-gray-300 rounded-lg mx-4 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>

      <ul className="max-h-96 overflow-y-auto space-y-2 py-3 scrollbar-thin scrollbar-track-[#123] scrollbar-thumb-blue-700">
        {filteredUsers.map((user) => {
          const isSelected = selectedUsers?.some((selected) => selected.id === user.id);

          return (
            <li
              key={user.id}
              className={`flex items-center justify-between p-3 mx-4 my-2 border border-white rounded-lg 
                               cursor-pointer hover:opacity-90 hover:bg-[#1b5575] shadow-md hover:shadow-[#405b6b] hover:scale-105 transition-all ease-in-out ${isSelected ? 'ring-1 ring-white' : 'text-white'
                }`}
              onClick={() => toggleUserSelection(user)}
            >
              <div>{user.name}</div>

              <div
                className={`w-6 h-6 flex items-center justify-center border-2 rounded transition-all duration-200
                                 ${isSelected
                    ? 'bg-white border-white text-blue-600'
                    : 'border-gray-300 text-transparent'
                  }`}
              >
                {isSelected && (
                  <LuCheck size={'1.2rem'} />
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-between mx-6 mt-4">
        <button
          onClick={handleCreateGroup}
          className="bg-gray-100 backdrop-blur-md hover:scale-105 text-blue-800 text-lg font-bold px-4 py-3 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
          disabled={!groupName || selectedUsers.length === 0}
        >
          Create Division
        </button>

        <button
          onClick={() => setShowCreateGroup(false)}
          className="bg-gray-900 backdrop-blur-md hover:scale-105 text-white text-lg font-bold px-4 py-3 rounded-xl focus:outline-none focus:ring focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
