import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useContentStore } from "../store/content.js";
const Navbar = () => {
  const [isMobileMenuOpen, setIsmobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { contentType, setContentType } = useContentStore();

  console.log("Content Type:", contentType);
  const toggleMobileMenu = () => {
    setIsmobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <header className=" max-w-6xl mx-auto flex flex-row items-center justify-between p-4 h-20 z-50">
        <div className="flex items-center gap-10 z-50">
          <Link to={"/"}>
            <img
              src="/netflix-logo.png"
              alt="netflix-logo"
              className="w-32 sm:w-40"
            />
          </Link>
          {/* desktop navbarItems */}
          <div className="hidden sm:flex gap-2 items-center">
            <Link
              to={"/"}
              className="hover:underline"
              onClick={() => setContentType("movie")}
            >
              Movies
            </Link>
            <Link
              to={"/"}
              className="hover:underline"
              onClick={() => setContentType("tv")}
            >
              Tv Shows
            </Link>
            <Link to={"/history"} className="hover:underline">
              Search History
            </Link>
          </div>
        </div>

        <div className="flex  items-center z-50 gap-6">
          <Link to={"/search"}>
            <Search className="size-6 cursor-pointer" />
          </Link>
          <img
            src={user.image}
            alt="Avatar"
            className="h-8 rounded cursor-pointer"
          />
          <LogOut className="size-6 cursor-pointer" onClick={logout} />

          <div className="sm:hidden">
            <Menu
              className="size-6 cursor-pointer"
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
        {/* mobile site */}
        {isMobileMenuOpen && (
          <div className="w-full absolute  left-0   sm:hidden mt-44 z-50 bg-black border rounded border-gray-800">
            <Link
              to={"/"}
              className="block hover:underline p-2 "
              onClick={toggleMobileMenu}
            >
              Movies
            </Link>
            <Link
              to={"/"}
              className="block hover:underline p-2 "
              onClick={toggleMobileMenu}
            >
              Tv Shows
            </Link>
            <Link
              to={"/history"}
              className="block hover:underline p-2 "
              onClick={toggleMobileMenu}
            >
              Search Histroy
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
