import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaServicestack,
  FaBriefcase,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";
import { IoAppsSharp } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";

const Header = ({ darkMode, setDarkMode }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      {/* Mobile Navigation Bar */}
      <header className="w-full fixed md:hidden bottom-0 left-0 z-[9999] bg-gradient-to-r from-ink via-tshirt to-sketch dark:bg-gradient-to-r dark:from-ink dark:via-sketch dark:to-tshirt text-white shadow-lg">
        <nav className="max-w-[968px] w-full h-[60px] m-auto flex justify-between items-center px-4">
          <Link to="/" className="text-2xl font-bold">
            Logo
          </Link>
          <div className="relative space-x-6 flex items-center">
            <button onClick={toggleDarkMode} className="text-2xl">
              {darkMode ? <IoSunnyOutline /> : <IoMdMoon />}
            </button>
            <button
              onClick={togglePopover}
              className="bg-white text-black font-semibold py-2 px-3 rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
            >
              {isPopoverOpen ? <FaTimes /> : <IoAppsSharp />}
            </button>
            {isPopoverOpen && (
              <div className="absolute bottom-[70px] right-0 w-56 rounded-lg bg-white text-black font-semibold shadow-lg py-4 px-6">
                <ul className="grid grid-cols-3 gap-x-6">
                  <li className="w-full">
                    <a
                      href="#Home"
                      className="flex flex-col items-center text-sm py-2 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <FaHome className="text-xl text-gray-800 hover:text-yellow-600" />
                      Home
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href="#About"
                      className="flex flex-col items-center text-sm py-2 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <FaUser className="text-xl text-gray-800 hover:text-yellow-600" />
                      About
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href="#Skills"
                      className="flex flex-col items-center text-sm py-2 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <FaClipboardList className="text-xl text-gray-800 hover:text-yellow-600" />
                      Skills
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href="#Education"
                      className="flex flex-col items-center text-sm py-2 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <FaServicestack className="text-xl text-gray-800 hover:text-yellow-600" />
                      Education
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href="#Projects"
                      className="flex flex-col items-center text-sm py-2 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <FaBriefcase className="text-xl text-gray-800 hover:text-yellow-600" />
                      Projects
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href="#ContactMe"
                      className="flex flex-col items-center text-sm py-2 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <FaEnvelope className="text-xl text-gray-800 hover:text-yellow-600" />
                      Contact Me!
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Large Screen Navigation Bar */}
      <main className="hidden z-10 sticky top-0 md:block">
        <section className="flex justify-between items-center bg-gradient-to-r from-ink via-tshirt to-sketch dark:bg-gradient-to-r dark:from-ink dark:via-sketch dark:to-tshirt text-white py-4 px-12 shadow-lg">
          <div className="flex">
            <p className="text-2xl font-bold">Logo</p>
          </div>
          <ul className="flex items-center gap-x-8 text-lg font-semibold">
            <li>
              <a
                href="#Home"
                className="hover:text-yellow-400 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#About"
                className="hover:text-yellow-400 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#Skills"
                className="hover:text-yellow-400 transition-colors"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#Education"
                className="hover:text-yellow-400 transition-colors"
              >
                Education
              </a>
            </li>
            <li>
              <a
                href="#Projects"
                className="hover:text-yellow-400 transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#ContactMe"
                className="hover:text-yellow-400 transition-colors"
              >
                Contact Me
              </a>
            </li>
            <li>
              <button onClick={toggleDarkMode} className="text-2xl">
                {darkMode ? <IoSunnyOutline /> : <IoMdMoon />}
              </button>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default Header;
