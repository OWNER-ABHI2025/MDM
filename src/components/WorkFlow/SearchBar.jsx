import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  isSearchFocused,
  setIsSearchFocused,
}) => {
  return (
    <div className="relative"> 
      <div
        className={`flex items-center w-full sm:w-64 rounded-lg transition-all duration-300 ${
          isSearchFocused
            ? "ring-2 ring-[#1C6BA0] bg-white dark:bg-gray-900"
            : "bg-gray-100 dark:bg-gray-900"
        }`}
      >
        <AiOutlineSearch className="text-gray-500 dark:text-gray-400 text-xl ml-3" />
        <input
          type="text"
          placeholder={`Search Workflows...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="w-full py-2.5 px-3 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full mr-1.5 transition-colors"
          >
            <AiOutlineClose className="text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};
