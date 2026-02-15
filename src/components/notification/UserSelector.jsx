import { useEffect, useState } from 'react';
import { useNotification } from '../../contexts/NotifcationContext';
import { getAllDevices } from '../../apis/devicesAPI';
import { IoIosSearch } from "react-icons/io";
import { LuCheck } from "react-icons/lu";

const UserSelector = () => {
  const { showUserSelector, setShowUserSelector, selectedUser, setSelectedUser } = useNotification();

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllDevices();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (showUserSelector) {
      const resetSelectedUser = () => {
        if(selectedUser?.length === 0) setSelectedUser([])
      };
      resetSelectedUser();
    }
  }, [setSelectedUser, showUserSelector]);

  const toggleUserSelection = (user) => {
    setSelectedUser((prevSelectedUsers) => {
      const validPrevSelectedUsers = Array.isArray(prevSelectedUsers) ? prevSelectedUsers : [];
  
      if (validPrevSelectedUsers.some((selected) => selected.id === user.id)) {
        return validPrevSelectedUsers.filter((selected) => selected.id !== user.id);
      }
      return [...validPrevSelectedUsers, user];
    });
  };
  
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!showUserSelector) return null;

  const handleConfirm = () => {
    setShowUserSelector(false);
  };

  return (
    <div className="bg-[#0D2C49] text-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-medium pb-8 mx-4">Select Users</h2>

      <div className="relative flex w-full">
          <IoIosSearch
            className="absolute left-6 top-1/3 -translate-y-1/3 text-gray-200"
            size={'1.2rem'}
          />
          <input
            type="text"
            placeholder="Search divisions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full bg-inherit border placeholder:text-gray-400 border-gray-300 rounded-lg mx-4 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

      <ul className="max-h-96 overflow-y-auto space-y-2 py-3 scrollbar-thin scrollbar-track-[#123] scrollbar-thumb-blue-700">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?.some((selected) => selected.id === user.id);

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

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleConfirm}
          className="mx-6 bg-gray-100 backdrop-blur-md hover:scale-105 text-blue-800 text-lg font-bold px-4 py-3 rounded-xl w-full 
                     focus:outline-none focus:ring focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default UserSelector;
