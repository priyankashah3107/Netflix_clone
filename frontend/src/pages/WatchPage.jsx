import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content.js";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import {
  ORIGINAL_IMG_BASE_URL,
  SMALL_IMG_BASE_URL,
} from "../utils/constant.js";
import { formatedReleaseDate } from "../utils/dateFunction.js";
import { WatchPageSkeleton } from "../components/skeletons/WatchPageSkeleton.jsx";
// fetching trailes of the movies

// function formatedReleaseDate(date) {
//   return new Date(date).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

const WatchPage = () => {
  const [trailers, setTrailers] = useState([]);
  const [currentTrailersIdx, setCurrentTrailersIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({}); // tv and movie details
  const { contentType } = useContentStore();
  const [similarContent, setSimilarContent] = useState([]);
  const sliderRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const getTrailersData = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        // console.log("GetTrailer data is ", res.data.content);
        setTrailers(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getTrailersData();
  }, [contentType, id]);

  // console.log("Trailers", trailers);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        // console.log("Similar getData", res.data.similar);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes(404)) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        console.log(res.data.message);
        setContent(res.data.message);
      } catch (error) {
        if (error.message.includes(404)) {
          setContent(null);
        }
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const handlePrev = () => {
    if (currentTrailersIdx > 0) {
      setCurrentTrailersIdx(currentTrailersIdx - 1);
    }
  };

  const handleNext = () => {
    if (currentTrailersIdx < trailers.length - 1) {
      setCurrentTrailersIdx(currentTrailersIdx + 1);
    }
  };

  console.log("SetContentDetails", content);
  console.log("Similar Content is", similarContent);

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-black min-h-screen text-white">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Oops! No Content Found
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4 px-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailersIdx === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentTrailersIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailersIdx === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed "
                  : ""
              }`}
              disabled={currentTrailersIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-20 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailersIdx].key}`}
            />
          )}

          {/* if there is no content available */}

          {trailers.length === 0 && (
            <h2 className="text-center text-2xl mt-5">
              Oops! 😓 There is no content available{" "}
              <span>{content?.title || content?.name}</span>
            </h2>
          )}
        </div>

        {/* movie details */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatedReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            className="max-h-[550px] rounded-md "
          />
        </div>

        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/Tv Show</h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group "
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content?.poster_path === null) return null;
                <Link
                  key={content.id}
                  to={`/watch/${content.id}`}
                  className="w-52 flex-none"
                >
                  <img
                    src={SMALL_IMG_BASE_URL + content?.poster_path}
                    alt="Poster Path"
                    className="w-full h-auto rounded-md"
                  />
                  <h4 className="mt-2 text-lg font-semibold">
                    {content?.title || content?.name}
                  </h4>
                </Link>;
              })}

              <ChevronRight
                className="absolute top-1/2 right-2 w-8 h-8 bg-blue-600 text-white rounded-full cursor-pointer"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 left-2 w-8 h-8 bg-blue-600 text-white rounded-full cursor-pointer"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>

    // <div>hhhhh</div>
  );
};

export default WatchPage;
