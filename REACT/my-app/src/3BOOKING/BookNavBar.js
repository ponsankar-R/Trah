import React, { useState } from 'react'; 
import { FaHome } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
import { MdCircleNotifications } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function BookNavBar({setBookingNavigation}) {
  const [activeButton, setActiveButton] = useState("bookingHome");

  const handleTruckNav = (buttonName) => {
    setActiveButton(buttonName);
    setBookingNavigation(buttonName);
  };

  const getButtonClasses = (buttonName) => {
    return activeButton === buttonName
      ? 'bg-blue-700 text-white'
      : 'bg-green-500 text-white';
  };

  return (
    <div>
      <div className='flex justify-around bg-slate-300 fixed bottom-0 left-0 w-full md:top-0 md:h-full md:w-fit md:flex-col z-50'>
        
        <button
          name="ActiveTripButton"
          onClick={() => handleTruckNav("bookingHome")}
          className={`flex flex-col items-center justify-center rounded-lg p-3 m-1 w-1/4 hover:bg-blue-950 md:w-auto md:m-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out ${getButtonClasses("bookingHome")}`}
        >
          <FaHome className='text-2xl mb-1' />
        </button>

        <button
          name="TruckButton"
          onClick={() => handleTruckNav("bookedTrucks")}
          className={`flex flex-col items-center justify-center rounded-lg p-3 m-1 w-1/4 hover:bg-blue-950 md:w-auto md:m-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out ${getButtonClasses("bookedTrucks")}`}
        >
          <MdBookmarkAdded className='text-2xl mb-1' />
        </button>

        <button
          name="NotificationButton"
          onClick={() => handleTruckNav("bookingNotification")}
          className={`flex flex-col items-center justify-center rounded-lg p-3 m-1 w-1/4 hover:bg-blue-950 md:w-auto md:m-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out ${getButtonClasses("bookingNotification")}`}
        >
          <MdCircleNotifications className='text-2xl mb-1' />
        </button>

        <button
          name="ProfileButton"
          onClick={() => handleTruckNav("bookingProfile")}
          className={`flex flex-col items-center justify-center rounded-lg p-3 m-1 w-1/4 hover:bg-blue-950 md:w-auto md:m-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out ${getButtonClasses("bookingProfile")}`}
        >
          <CgProfile className='text-2xl mb-1' />
        </button>

      </div>
    </div>
  );
}
