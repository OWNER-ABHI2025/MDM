import { useEffect, useState } from 'react';
import { useNotification } from '../../contexts/NotifcationContext';
import CreateGroup from './CreateGroup';
import { getAllGroups } from '../../apis/groupsAPI';
import { IoIosSearch } from "react-icons/io";
import { LuCheck } from "react-icons/lu";
import { MdOutlineGroupAdd } from "react-icons/md";


const GroupSelector = () => {
  const {
    showGroupSelector,
    setShowGroupSelector,
    selectedGroup,
    setSelectedGroup,
    showCreateGroup,
    setShowCreateGroup,
  } = useNotification();

  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      const fetchedGroups = await getAllGroups();
      setGroups(fetchedGroups);
    };

    fetchGroups();
  }, [showCreateGroup]);

  useEffect(() => {
    if (showGroupSelector) {
      const resetSelectedGroup = () => {
        if(selectedGroup?.length === 0) setSelectedGroup([])
      };
      resetSelectedGroup();
    }
  }, [setSelectedGroup, showGroupSelector]);

  const toggleGroupSelection = (group) => {
    setSelectedGroup((prevSelectedGroups) => {
      const validPrevSelectedGroups = Array.isArray(prevSelectedGroups) ? prevSelectedGroups : [];

      if (validPrevSelectedGroups?.some((selected) => selected.id === group.id)) {
        return validPrevSelectedGroups.filter((selected) => selected.id !== group.id);
      }
      return [...validPrevSelectedGroups, group];
    });
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!showGroupSelector) return null;

  const handleConfirm = () => {
    setShowGroupSelector(false);
  };

  return showCreateGroup ? (
    <CreateGroup />
  ) : (
    <div className="bg-[#0D2C49] text-gray-100 shadow-lg rounded-lg p-6 w-full">
      <>
        <div className='flex justify-between items-center mx-4 pb-8'>
          <h2 className="text-xl font-medium">Select Divisions</h2>
          <button
            onClick={() => setShowCreateGroup(true)}
            className="bg-blue-600 text-white w-fit px-4 py-2 mr-6 rounded hover:bg-blue-700 flex items-center justify-center"
          >
            <span>
              <MdOutlineGroupAdd size={'1.2rem'} />
            </span>
          </button>
        </div>

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

        <ul className="max-h-96 overflow-y-auto space-y-2 py-3 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300 scrollbar-thumb-rounded">
          {filteredGroups.map((group) => {
            const isSelected = selectedGroup?.some((selected) => selected.id === group.id);

            return (
              <li
                key={group.id}
                className={`flex items-center justify-between p-3 mx-4 my-2 border border-white rounded-lg 
                  cursor-pointer hover:opacity-90 hover:bg-[#1b5575] shadow-md hover:shadow-[#405b6b] hover:scale-105 transition-all ease-in-out ${isSelected ? 'ring-1 ring-white' : 'text-white'
                  }`}
                onClick={() => toggleGroupSelection(group)}
              >
                <div>{group.name}</div>
                <div
                  className={`w-6 h-6 flex items-center justify-center border-2 rounded transition-all duration-200 ${isSelected
                    ? 'bg-white border-white text-blue-600'
                    : 'border-gray-300 text-transparent'
                    }`}
                >
                  {isSelected && <LuCheck size={'1.2rem'} />}
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
      </>
    </div>
  );
};

export default GroupSelector;
