import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaCaretRight } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { SlLogout } from "react-icons/sl";
import { GoTriangleDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxState/Slices/authSlice";
import { useLogOutAPIMutation } from "../ReduxState/Slices/userApiSlice";

const Header = () => {
  const [logOutAPI] = useLogOutAPIMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const header = ["About", "Skills", "Projects", "Contact"];
  const userInfo = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = async () => {
    try {
      await logOutAPI().unwrap(); // Correctly call the API to log out
      dispatch(logout()); // Properly dispatch the logout action
      navigate("/", { replace: true }); // Navigate to the home page
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo or Name */}
        <div className="text-2xl font-bold tracking-widest hover:scale-105 transition-transform">
          Eniyavan
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          {header.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `relative text-lg font-semibold tracking-wide ${
                  isActive ? "text-yellow-300" : "text-white"
                } hover:text-yellow-300 transition-colors`
              }
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300 scale-x-0 hover:scale-x-100 origin-left transition-transform"></span>
            </NavLink>
          ))}
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/eniyavanev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-colors"
            title="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/eniyavan-a-738a20288/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-colors"
          >
            <FaTwitter size={24} />
          </a>
        </div>

        {/* Call to Action and Auth Buttons */}
        <div className="relative flex space-x-4">
          <button className="bg-yellow-300 text-black font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-400 transition-colors">
            View Resume
          </button>
          {userInfo ? (
            <div className="relative">
              {/* Name Button */}
              <button
                className="bg-white flex justify-center items-center text-black font-semibold py-2 px-4 rounded shadow-lg hover:bg-yellow-400 transition-colors"
                onClick={handleDropdownToggle}
              >
                {userInfo.name} &nbsp;{" "}
                {isDropdownOpen ? (
                  <GoTriangleDown size={15} />
                ) : (
                  <FaCaretRight size={15} />
                )}
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-[120px] rounded-md bg-white text-black shadow-lg">
                  <NavLink to="/ProtectedRoutes/profile">
                    <button
                      className="flex justify-center items-center w-full text-left px-4 py-2 hover:bg-yellow-300 transition-colors"
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                    >
                      Profile &nbsp; <CgProfile size={20} />
                    </button>
                  </NavLink>
                  <button
                    className="flex justify-center items-center w-full text-left px-4 py-2 hover:bg-yellow-300 transition-colors"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogOut(); // Call handleLogOut function
                    }}
                  >
                    Logout &nbsp; <SlLogout size={15} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/Login">
                <button className="bg-white text-black font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-400 transition-colors">
                  Login
                </button>
              </NavLink>
              <NavLink to="/Signup">
                <button className="bg-white text-black font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-400 transition-colors">
                  Signup
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
