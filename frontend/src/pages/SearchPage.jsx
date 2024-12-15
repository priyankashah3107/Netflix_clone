import React, { act, useState } from "react";
import { useEffect } from "react";
import { useContentStore } from "../store/content.js";
import Navbar from "../components/Navbar.jsx";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constant";
const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    // setActiveTab(tab);
    // tab === "movie" ? setContentType("movie") : setActiveTab("tv");
    setActiveTab(tab);
    setContentType(tab);
    setResults([]);
  };

  // we can make this handleSearch to useFetchDebounceHook
  // Make this
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error Occurred, please try again later");
      }
    }
  };
  // console.log(searchTerm);
  // console.log("Results for Searchs", results);
  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center gap-3 mb-4">
            <button
              className={`py-2 px-4 rounded ${
                activeTab === "movie" ? "bg-red-600" : "bg-gray-700"
              } hover:bg-red-600`}
              onClick={() => handleTabClick("movie")}
            >
              Movies
            </button>
            <button
              className={`py-2 px-4 rounded ${
                activeTab === "tv" ? "bg-red-600" : "bg-gray-700"
              } hover:bg-red-600`}
              onClick={() => handleTabClick("tv")}
            >
              Tv Shows
            </button>
            <button
              className={`py-2 px-4 rounded ${
                activeTab === "person" ? "bg-red-600" : "bg-gray-700"
              } hover:bg-red-600`}
              onClick={() => handleTabClick("person")}
            >
              Person
            </button>
          </div>

          <form
            className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search for a  ${activeTab}`}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />

            <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
              <Search className="size-6" />
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-10">
            {results.map((results) => {
              if (!results?.poster_path && !results?.profile_path) return null;

              return (
                <div key={results.id} className="bg-gray-800 p-4 rounded">
                  {activeTab === "person" ? (
                    <Link
                      to={"/actor/" + results.name}
                      className="flex flex-col items-center"
                    >
                      <img
                        src={ORIGINAL_IMG_BASE_URL + results?.profile_path}
                        alt={results?.name}
                        className="max-h-96 rounded mx-auto"
                      />
                      <h2 className="mt-2 text-xl font-bold">
                        {results?.name}
                      </h2>
                    </Link>
                  ) : (
                    <Link to={"/watch/" + results?.id}>
                      <img
                        src={ORIGINAL_IMG_BASE_URL + results?.poster_path}
                        alt={results?.title || results?.name}
                        className="w-full h-auto rounded "
                      />
                      <h2 className="mt-2 text-xl font-bold">
                        {results?.title || results?.name}
                      </h2>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
