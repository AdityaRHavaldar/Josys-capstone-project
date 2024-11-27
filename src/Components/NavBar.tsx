import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-200 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-3xl font-semibold hover:text-gray-200 transition-colors duration-300"
        >
          <img
            src="https://www.ikea.com/global/assets/logos/brand/ikea.svg"
            alt="Ikea"
          />
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/login"
            className=" text-lg hover:text-blue-800 transition-colors duration-300 hover:scale-105"
          >
            Login
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white p-4 space-y-4">
          <Link
            to="/login"
            className="block text-lg hover:text-blue-200 transition-colors duration-300 hover:scale-105"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block text-lg hover:text-blue-200 transition-colors duration-300 hover:scale-105"
            onClick={toggleMenu}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
