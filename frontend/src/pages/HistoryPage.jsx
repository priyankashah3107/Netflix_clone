// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Navbar from "../components/Navbar";
// import { SMALL_IMG_BASE_URL } from "../utils/constant";

// function formatDate(dateString) {
//   const date = new Date(dateString);

//   const monthNames = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May,",
//     "Jun",
//     "jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const month = monthNames[date.getUTCMonth()];
//   const day = date.getUTCDate();
//   const year = date.getUTCFullYear();

//   return `${month} ${day} ${year}`;
// }

// const HistoryPage = () => {
//   const [searchHistory, setSearchHistory] = useState([]);

//   useEffect(() => {
//     const getSearchHistory = async () => {
//       try {
//         const res = await axios.get("/api/v1/search/history");
//         setSearchHistory(res.data.content);
//       } catch (error) {
//         if (error.response.status === 404) {
//           toast.error("No Search History ");
//         }
//         console.log("Error in SearchHistory", error);
//         setSearchHistory([]);
//       }
//     };

//     getSearchHistory();
//   }, []);
//   console.log("Search History is:", searchHistory);

//   if (searchHistory.length === 0) {
//     return (
//       <div className="bg-black min-h-screen text-white">
//         <Navbar />
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-8">Search History</h1>
//           <div className="flex justify-center items-center h-96">
//             <p className="text-xl">No search History Found</p>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <>
//       <div className="bg-black text-white min-h-screen">
//         <Navbar />
//         <div className="max-w-6xl mx-auto px-4 py-8 ">
//           <h2 className=""> Search History</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {searchHistory?.map((entry) => (
//               <div
//                 key={entry.id}
//                 className="bg-gray-800 p-4 rounded flex items-start"
//               >
//                 <img
//                   src={SMALL_IMG_BASE_URL + entry.image}
//                   alt="History img"
//                   className="size-16 rounded-full object-cover mr-4"
//                 />

//                 <div className="flex flex-col">
//                   <span>{entry?.title || entry?.name}</span>
//                   <span>
//                     {formatDate(entry?.createdAt)}
//                     {entry?.searchType}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HistoryPage;

// problem in HistroyPage

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constant";

// Function to format dates into "MMM DD YYYY" format
function formatDate(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  // Fetch search history on component mount
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        // Ensure data is valid before setting state
        setSearchHistory(res.data.content || []);
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error("No Search History Found");
        } else {
          toast.error("Failed to fetch search history");
        }
        console.error("Error fetching search history:", error);
        setSearchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  // Debug log to check the fetched data
  console.log("Search History:", searchHistory);

  // If there is no search history, display a placeholder message
  if (searchHistory.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  // Main render for when search history exists
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Search History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory?.map((entry) => (
            <div
              key={entry.id} // Use a unique identifier as the key
              className="bg-gray-800 p-4 rounded flex items-start"
            >
              <img
                src={SMALL_IMG_BASE_URL + entry?.image || "/placeholder.jpg"} // Fallback image
                alt="History img"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-lg font-semibold">
                  {entry?.name || "Unknown Title"}
                </span>
                <span className="text-sm text-gray-400">
                  {entry.createdAt
                    ? formatDate(entry?.createdAt)
                    : "Unknown Date"}
                  {entry?.searchType && ` - ${entry?.searchType}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
