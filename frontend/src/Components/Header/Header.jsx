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
import { navItems } from "../Data/Data";
import lightLogo from "../../assets/Images/Header-Logo-light.png";
import darkLogo from "../../assets/Images/Header-Logo-dark.png";

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
      <header className="w-full fixed md:hidden bottom-0 left-0 z-[9999] bg-sketch dark:bg-tshirt  text-white  shadow-lg shadow-black">
        <nav className="max-w-[968px] w-full h-[60px] m-auto flex justify-between items-center px-4">
          <Link to="/" className="text-2xl font-bold">
          {/* <img src={darkMode ? darkLogo : lightLogo} alt="" className="w-[100px] h-[50px] object-cover rounded-full"/> */}
            <p>Eniyavan </p>
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
                  {navItems.map((item) => (
                    <li key={item.id} className="w-full">
                      <a
                        href={item.href}
                        className="flex flex-col text-center items-center text-sm py-2   rounded transition-colors"
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Large Screen Navigation Bar */}
      <main className="hidden z-10 sticky top-0 md:block">
        <section className="flex justify-between items-center bg-sketch dark:bg-tshirt dark:text-white py-4 px-12 shadow-lg">
          <div className="flex">
            {/* <img src={darkMode ? darkLogo : lightLogo} alt="" className="w-[150px] h-[50px] object-cover rounded-full"/> */}
            <p className="text-3xl text-white font-bold dark:hover:text-gold">Eniyavan</p>
          </div>
          <ul className="flex items-center gap-x-8 text-lg font-semibold ">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="text-white hover:text-red-500 dark:hover:text-gold transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={toggleDarkMode}
                className="text-2xl text-white hover:text-red-500 dark:hover:text-gold transition-colors"
                title={`Change theme to ${darkMode ? "lightMode" : "darkMode"}`}
              >
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
