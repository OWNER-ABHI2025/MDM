import { useState } from "react";

const SendAlertPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [priority, setPriority] = useState("low");
  const [recipientType, setRecipientType] = useState("users");

  const handleUserSelection = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((user) => user !== id) : [...prev, id]
    );
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const mockUsers = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Send Alert</h1>

        {/* Textarea for alert message */}
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Type your alert message here..."
          rows="4"
        ></textarea>

        {/* Priority Options */}
        <div className="mb-4">
          <p className="font-medium mb-2">Priority:</p>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priority"
                value="high"
                className="hidden peer"
                onChange={() => handlePriorityChange("high")}
                checked={priority === "high"}
              />
              <span className="w-5 h-5 rounded-full border-4 border-red-500 peer-checked:bg-red-500"></span>
              <span>High</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priority"
                value="medium"
                className="hidden peer"
                onChange={() => handlePriorityChange("medium")}
                checked={priority === "medium"}
              />
              <span className="w-5 h-5 rounded-full border-4 border-yellow-500 peer-checked:bg-yellow-500"></span>
              <span>Medium</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priority"
                value="low"
                className="hidden peer"
                onChange={() => handlePriorityChange("low")}
                checked={priority === "low"}
              />
              <span className="w-5 h-5 rounded-full border-4 border-green-500 peer-checked:bg-green-500"></span>
              <span>Low</span>
            </label>
          </div>
        </div>

        {/* Recipient Type Options */}
        <div className="mb-4">
          <p className="font-medium mb-2">Send To:</p>
          <div className="flex space-x-4">
            {[
              { value: "users", label: "Users" },
              { value: "division", label: "Division" },
              { value: "all", label: "All" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => value !== "all" && setIsModalOpen(true)}
              >
                <input
                  type="radio"
                  value={value}
                  checked={recipientType === value}
                  onChange={() => setRecipientType(value)}
                  className="form-radio h-5 w-5 text-blue-600 hidden"
                />
                <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  {recipientType === value && <span className="w-3 h-3 bg-blue-600 rounded-full"></span>}
                </span>
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-6">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Send Notification
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Save as Draft
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-lg w-96">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Select Users</h2>
            <div className="space-y-3">
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                    selectedUsers.includes(user.id) ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleUserSelection(user.id)}
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">ID: {user.id}</p>
                  </div>
                  {selectedUsers.includes(user.id) && (
                    <span className="text-blue-600 font-bold">✓</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
              >
                Confirm Selection
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUsers([]);
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendAlertPage;
