import React, { useState } from 'react';
import { FaRoad } from "react-icons/fa";
import { GiTruck } from "react-icons/gi";
import { MdCircleNotifications } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function TruckNavBar({ setTruckNavigation }) {
  // State to keep track of the active button
  const [activeButton, setActiveButton] = useState("ActiveTripButton");

  // Function to handle button clicks
  const handleTruckNav = (buttonName) => {
    setActiveButton(buttonName); // Set the clicked button as active
    setTruckNavigation(buttonName);
  };

  // Button color for the active button
  const getButtonClasses = (buttonName) => {
    return activeButton === buttonName
      ? 'bg-blue-700 text-white' // Dark green color for active button
      : 'bg-green-500 text-white'; // Default color for other buttons
  };

  return (
    <div>
      {/* Container for the navigation */}
      <div className='flex justify-around bg-slate-300 fixed bottom-0 left-0 w-full md:top-0 md:h-full md:w-fit md:flex-col z-50'>

        {/* Active Trips Button */}
        <button
          name="ActiveTripButton"
          onClick={() => handleTruckNav("ActiveTripButton")}
          className={`ActiveTripButton flex flex-col items-center justify-center rounded-lg p-3 m-1 w-1/4 hover:bg-blue-950 md:w-auto md:m-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out ${getButtonClasses("ActiveTripButton")}`}
        >
          <FaRoad className='text-2xl mb-1' />
        </button>

        {/* Trucks Button */}
        <button
          name="TruckButton"
          onClick={() => handleTruckNav("TruckButton")}
          className={`TruckButton flex flex-col items-center justify-center rounded-lg p-3 m-1 w-1/4 hover:bg-blue-950 md:w-auto md:m-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out ${getButtonClasses("TruckButton")}`}
        >
          <GiTruck className='text-2xl mb-1' />
        </button>

        {/* Notification Button */}
        <button
          name="NotificationButton"
          onClick={() => handleTruckNav("NotificationButton")}
          className={`NotificationButton flex flex-col items-center justify-center rounded-lg p-3 m-1 w-1/4 hover:bg-blue-950 md:w-auto md:m-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out ${getButtonClasses("NotificationButton")}`}
        >
          <MdCircleNotifications className='text-2xl mb-1' />
        </button>

        {/* Profile Button */}
        <button
          name="ProfileButton"
          onClick={() => handleTruckNav("ProfileButton")}
          className={`ProfileButton flex flex-col items-center justify-center rounded-lg p-3 m-1 w-1/4 hover:bg-blue-950 md:w-auto md:m-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out ${getButtonClasses("ProfileButton")}`}
        >
          <CgProfile className='text-2xl mb-1' />
        </button>

      </div>
    </div>
  );
}
