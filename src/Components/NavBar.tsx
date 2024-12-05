import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Product } from "../Services/ProductServices";
import { IoCloseSharp } from "react-icons/io5";
import { TbShoppingBagHeart } from "react-icons/tb";

const fetchSearchSuggestions = async (query: string) => {
  const response = await fetch(`http://localhost:3200/products?q=${query}`);
  const products = await response.json();
  return products;
};

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [user, setUser] = useState(sessionStorage.getItem("role"));
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(async () => {
      if (query.trim()) {
        const suggestions = await fetchSearchSuggestions(query);
        setSearchSuggestions(suggestions);
      } else {
        setSearchSuggestions([]);
      }
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search for:", searchQuery);
    }
  };

  const handleSearchSuggestionsClick = (selectedItem: Product) => {
    setSearchQuery(selectedItem.name);
    setSearchSuggestions([]);

    if (selectedItem.category) {
      navigate(`/home/ProductDashboard?categories=${selectedItem.category}`);
    }
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    window.location.href = "/home/index";
    setUser(null);
  };

  return (
    <nav className=" shadow-md relative top-0 z-50">
      {!user && (
        <div className="bg-slate-700 text-white p-1 text-center w-full">
          Join IEKA family & get 50% off on delivery services. T&C apply.
        </div>
      )}
      <div className="px-4 py-4 flex justify-between items-center">
        <Link
          to="/home/index"
          className="text-white text-3xl font-semibold hover:text-gray-200 transition-colors duration-300"
        >
          <img src="/Images/ieka.webp" alt="Ikea" className="h-9" />
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center min-w-[30rem] mr-[50%] ml-3"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-full shadow-md focus:outline-none"
            placeholder="What are you looking for?..."
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 px-4 py-2 text-[#ccc] rounded-tl-[0] rounded-tr-[50px] rounded-br-[50px] rounded-bl-[0] focus:outline-none hover:text-[#848383]"
          >
            <FaSearch />
          </button>

          {searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto z-10">
              <ul className="space-y-1">
                {searchSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 text-left hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleSearchSuggestionsClick(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
        <Link to={"/home/bag"}>
          <button className="text-2xl p-2 rounded-full hover:bg-slate-400 transition-colors duration-300 hover:scale-105">
            <TbShoppingBagHeart />
          </button>
        </Link>
        {user ? (
          <div>
            <button
              onClick={handleLogOut}
              className="text-lg transition-colors text-nowrap p-2 rounded-full hover:bg-slate-400 duration-300 hover:scale-105"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-6">
            <button
              onClick={toggleMenu}
              className="text-lg transition-colors rounded-full p-2 hover:bg-slate-400 duration-300 hover:scale-105"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-full flex">
          <div className="w-full bg-black opacity-30"></div>
          <div
            className=" w-[450px] bg-white p-4 space-y-4 z-30 transform transition-transform duration-300 ease-in-out"
            style={{
              transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <div className="flex justify-end px-8">
              <button
                className="font-bold text-2xl m-4 duration-300 hover:scale-105"
                onClick={toggleMenu}
              >
                <IoCloseSharp />
              </button>
            </div>
            <div className="flex justify-between items-center px-8">
              <h1 className="text-2xl font-bold">Hey</h1>
              <Link
                to="/login/user"
                state={{ isSignUp: false }}
                className="block text-lg bg-black text-white font-semibold px-4 py-2 rounded-full shadow-md duration-300 hover:scale-105"
                onClick={toggleMenu}
              >
                Login
              </Link>
            </div>
            <hr />
            <Link
              to="/login/user"
              state={{ isSignUp: true }}
              className="block text-lg  duration-300 hover:scale-105 px-8"
              onClick={toggleMenu}
            >
              Join IEKA Family / Sign up
            </Link>
            <hr />
            <Link
              to="/login/supplier"
              state={{ isSignUp: true }}
              className="block text-lg  duration-300 hover:scale-105 px-8"
              onClick={toggleMenu}
            >
              Supplier Business Network
            </Link>
            <hr />
            <Link
              to="/login/admin"
              state={{ isSignUp: true }}
              className="block text-lg  duration-300 hover:scale-105 px-8"
              onClick={toggleMenu}
            >
              Admin Controles
            </Link>
            <hr />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
