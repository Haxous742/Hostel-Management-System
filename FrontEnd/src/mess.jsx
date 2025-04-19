import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/NavBar';
import SideBar from './Components/SideBar';

const Menu = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [breakfastRating, setBreakfastRating] = useState(0);
  const [lunchRating, setLunchRating] = useState(0);
  const [snacksRating, setSnacksRating] = useState(0);
  const [dinnerRating, setDinnerRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const weeklyMenu = [
    { day: 'Monday', breakfast: 'Dosa, Idly', lunch: 'Rice, Dal, Veg Curry', snacks: 'Samosa, Tea', dinner: 'Chapatis, Paneer Masala' },
    { day: 'Tuesday', breakfast: 'Poha, Tea', lunch: 'Pulao, Raita', snacks: 'Pakora, Coffee', dinner: 'Noodles, Manchurian' },
    { day: 'Wednesday', breakfast: 'Upma, Coffee', lunch: 'Biryani, Salad', snacks: 'Biscuits, Juice', dinner: 'Paratha, Aloo Gobi' },
    { day: 'Thursday', breakfast: 'Vada, Sambar', lunch: 'Rice, Fish Curry', snacks: 'Sandwich, Milkshake', dinner: 'Pizza, Soup' },
    { day: 'Friday', breakfast: 'Pancakes, Juice', lunch: 'Khichdi, Papad', snacks: 'Dhokla, Chai', dinner: 'Roti, Chicken Curry' },
    { day: 'Saturday', breakfast: 'Omelette, Toast', lunch: 'Fried Rice, Veg Stir-fry', snacks: 'Spring Rolls, Soda', dinner: 'Pasta, Garlic Bread' },
    { day: 'Sunday', breakfast: 'Idli, Chutney', lunch: 'Thali (Rice, Dal, Sabzi)', snacks: 'Murukku, Coffee', dinner: 'Dosa, Chutney' },
  ];

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : weeklyMenu.length - 1));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => (prev < weeklyMenu.length - 1 ? prev + 1 : 0));
  };

  const handleSubmitRating = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(`Submitted ratings for ${weeklyMenu[currentDayIndex].day}:`);
      console.log(`Breakfast: ${breakfastRating} stars`);
      console.log(`Lunch: ${lunchRating} stars`);
      console.log(`Snacks: ${snacksRating} stars`);
      console.log(`Dinner: ${dinnerRating} stars`);
      setBreakfastRating(0);
      setLunchRating(0);
      setSnacksRating(0);
      setDinnerRating(0);
      setIsSubmitting(false);
    }, 500);
  };

  // Dummy onLogout for Navbar
  const handleLogout = () => {
    console.log('Logged out');
  };

  const currentDay = weeklyMenu[currentDayIndex];

  return (
    <div className="min-h-screen bg-[#0f172a] dark:bg-gray-800">
      <Navbar onLogout={handleLogout} />
      <SideBar />
      <div className="pt-20 sm:pl-64 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-800 dark:bg-gray-900 rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <button onClick={handlePrevDay} className="text-white dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
                <svg className="w-6 h-6 transform hover:scale-110 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-semibold text-white dark:text-gray-100">{currentDay.day}</h1>
              <button onClick={handleNextDay} className="text-white dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
                <svg className="w-6 h-6 transform hover:scale-110 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white dark:text-gray-300 font-medium mb-2">Breakfast</p>
                  <p className="text-white dark:text-gray-200">{currentDay.breakfast}</p>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setBreakfastRating(star)}
                      className={`text-2xl transform transition-transform duration-200 hover:scale-125 ${star <= breakfastRating ? 'text-red-500 dark:text-red-400' : 'text-gray-300 dark:text-gray-500'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white dark:text-gray-300 font-medium mb-2">Lunch</p>
                  <p className="text-white dark:text-gray-200">{currentDay.lunch}</p>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setLunchRating(star)}
                      className={`text-2xl transform transition-transform duration-200 hover:scale-125 ${star <= lunchRating ? 'text-red-500 dark:text-red-400' : 'text-gray-300 dark:text-gray-500'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white dark:text-gray-300 font-medium mb-2">Snacks</p>
                  <p className="text-white dark:text-gray-200">{currentDay.snacks}</p>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSnacksRating(star)}
                      className={`text-2xl transform transition-transform duration-200 hover:scale-125 ${star <= snacksRating ? 'text-red-500 dark:text-red-400' : 'text-gray-300 dark:text-gray-500'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white dark:text-gray-300 font-medium mb-2">Dinner</p>
                  <p className="text-white dark:text-gray-200">{currentDay.dinner}</p>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setDinnerRating(star)}
                      className={`text-2xl transform transition-transform duration-200 hover:scale-125 ${star <= dinnerRating ? 'text-red-500 dark:text-red-400' : 'text-gray-300 dark:text-gray-500'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmitRating}
              disabled={isSubmitting}
              className={`mt-6 w-full py-2 rounded-lg font-semibold text-white transition-colors ${isSubmitting ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Rating'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;