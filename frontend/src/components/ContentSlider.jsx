// import React, { useEffect, useState } from "react";
// import { useContentStore } from "../store/content.js";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { SMALL_IMG_BASE_URL } from "../utils/constant";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const ContentSlider = ({ category }) => {
//   const { contentType } = useContentStore();
//   const [content, setContent] = useState([]);
//   const [showArrows, setShowArrows] = useState(false);
//   const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";
//   const formattedCategoryName =
//     category.replaceAll("_", " ")[0].toUpperCase() +
//     category.replaceAll("_", " ").slice(1);

//   async function getContentData() {
//     try {
//       const response = await axios.get(`/api/v1/${contentType}/${category}`);
//       setContent(response.data.categories);
//     } catch (error) {
//       console.error("Error in Data Fetching", error);
//     }
//   }

//   useEffect(() => {
//     getContentData();
//   }, [contentType, category]);

//   return (
//     <div
//       className="bg-black text-white px-5 md:px-20 py-8"
//       onMouseEnter={() => setShowArrows(true)}
//       onMouseLeave={() => setShowArrows(false)}
//     >
//       <h2 className="text-2xl font-bold mb-4">
//         {formattedCategoryName} {formattedContentType}
//       </h2>

//       {/* Content Slider */}
//       <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
//         {content.map((item) => (
//           <Link
//             to={`/watch/${item.id}`}
//             className="max-w-[200px] shrink-0 group"
//             key={item.id}
//           >
//             <div className="rounded-lg overflow-hidden">
//               <img
//                 src={
//                   SMALL_IMG_BASE_URL + item?.backdrop_path ||
//                   SMALL_IMG_BASE_URL + item?.poster_path
//                 }
//                 alt={item?.title || "Image"}
//                 className="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
//               />
//               <p className="mt-2 text-center">{item?.title || item?.name}</p>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {showArrows && (
//         <>
//           <button className="  -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10">
//             <ChevronLeft size={24} />
//           </button>

//           <button className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10">
//             <ChevronRight size={24} />
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ContentSlider;

import React, { useEffect, useState, useRef } from "react";
import { useContentStore } from "../store/content.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constant";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ContentSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);

  async function getContentData() {
    try {
      const response = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(response.data.categories);
    } catch (error) {
      console.error("Error in Data Fetching", error);
    }
  }

  useEffect(() => {
    getContentData();
  }, [contentType, category]);

  // Scroll slider left
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  // Scroll slider right
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="bg-black text-white px-5 md:px-20 py-8 relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-2xl font-bold mb-4">
        {formattedCategoryName} {formattedContentType}
      </h2>

      {/* Content Slider */}
      <div
        className="flex gap-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="max-w-[200px] shrink-0 group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={
                  SMALL_IMG_BASE_URL + item?.backdrop_path ||
                  SMALL_IMG_BASE_URL + item?.poster_path
                }
                alt={item?.title || "Image"}
                className="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <p className="mt-2 text-center">{item?.title || item?.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Left Arrow */}
      {showArrows && (
        <>
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-10 flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-10 flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default ContentSlider;
