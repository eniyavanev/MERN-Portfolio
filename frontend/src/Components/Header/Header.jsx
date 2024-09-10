import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Header = () => {
  const header = ['About', 'Skills', 'Projects', 'Contact'];

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
                  isActive ? 'text-yellow-300' : 'text-white'
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
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/eniyavan-a-738a20288/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-colors"
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
        <div className="flex space-x-4">
          <button className="bg-yellow-300 text-black font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-400 transition-colors">
            View Resume
          </button>
          <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-100 transition-colors">
            Login
          </button>
          <NavLink to="/signup">
          <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-100 transition-colors">
            Signup
          </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
