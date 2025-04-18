import React, { useState, useEffect } from 'react';

const Navbar = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-sm">
      <div className="px-4 py-3 lg:px-6 lg:pl-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-transform duration-200"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 transform transition-transform duration-300 hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <a href="#" className="flex items-center ms-3 md:me-24">
              <svg
                className="w-8 h-8 mr-2 text-blue-600 dark:text-blue-400 transition-transform duration-200 hover:scale-105"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap  bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Hostel Management System
              </span>
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-600 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <img
                src={
                  isDarkMode
                    ? 'https://img.icons8.com/ios-filled/50/000000/moon-symbol.png'
                    : 'https://img.icons8.com/ios-filled/50/000000/sun.png'
                }
                alt={isDarkMode ? 'Moon icon' : 'Sun icon'}
                className="w-5 h-5 object-contain"
              />
            </button>
            <div className="flex items-center relative">
              <button
                type="button"
                className="flex text-sm rounded-full focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-600 transition-all duration-200"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-9 h-9 rounded-full border-2 border-blue-500 dark:border-blue-400 object-cover transition-transform duration-200 hover:scale-105"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </button>
              <div
                className={`absolute right-0 top-12 z-50 ${
                  isDropdownOpen ? 'block' : 'hidden'
                } w-44 my-2 text-base list-none bg-white rounded-xl shadow-xl dark:bg-gray-700 dark:shadow-gray-800 transition-all duration-300 ease-in-out transform ${
                  isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
                id="dropdown-user"
              >
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white transition-all duration-150 ease-in-out transform hover:scale-105"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={onLogout}
                      className="inline-block mx-4 mt-1 mb-2 px-4 py-1 text-sm text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg transition-all duration-150 ease-in-out transform hover:scale-105"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;