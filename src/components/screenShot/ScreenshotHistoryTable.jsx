import React, { useEffect, useState } from "react";
import { getScreenshotHistory } from "../../apis/screenShots";

const ScreenshotHistoryTable = () => {
  const [screenshots, setScreenshots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const data = await getScreenshotHistory();
        setScreenshots(data.screenshot_details);
      } catch (error) {
        console.error("Error fetching screenshot history:", error);
      }
    };

    fetchScreenshots();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = screenshots.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(screenshots.length / itemsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Screenshot History</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-200 text-sm leading-normal">
              {[
                "Screenshot ID",
                "Device ID",
                "Device Info",
                "File Name",
                "Created At",
                "Interval (min)",
                "Timer Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="py-3 px-6 text-left text-sm font-medium border-b border-r"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((screenshot) => (
              <tr key={screenshot.screenshot_id} className="text-gray-800 dark:text-gray-300 text-sm leading-normal">
                <td className="py-4 px-6 border-b border-r">{screenshot.screenshot_id}</td>
                <td className="py-4 px-6 border-b border-r">{screenshot.device_id}</td>
                <td className="py-4 px-6 border-b border-r">{screenshot.device_info}</td>
                <td className="py-4 px-6 border-b border-r">
                  {screenshot.file_name || "N/A"}
                </td>
                <td className="py-4 px-6 border-b border-r">
                  {new Date(screenshot.created_at).toLocaleString()}
                </td>
                <td className="py-4 px-6 border-b border-r">{screenshot.interval_minutes}</td>
                <td className="py-4 px-6 border-b border-r">
                  {screenshot.is_enabled ? "Enabled" : "Disabled"}
                </td>
                <td className="py-4 px-6 border-b">
                  <button className="text-blue-500 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ScreenshotHistoryTable;
