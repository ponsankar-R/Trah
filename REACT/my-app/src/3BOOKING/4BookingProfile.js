import React, { useContext, useState, useEffect } from 'react';
import { FiHelpCircle, FiLogOut } from 'react-icons/fi'; // React icons for Help and SignOut
import { PanelContext } from '../App';
import { useNavigate } from 'react-router-dom';
import BookingHelp from './BookingHelp';

function BookingProfile() {
  const setWhereToGoNext = useContext(PanelContext);
  const navigate = useNavigate();
  const [isBookingHelpOpen, setIsBookingHelpOpen] = useState(false);
  const [user, setUser] = useState({});

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user data found
      navigate('/');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('user');  // Remove user data from localStorage
    setWhereToGoNext(false);  // Update context value
    navigate('/');  // Redirect to login page
  };

  const handleBookingHelp = () => {
    setIsBookingHelpOpen(prevState => !prevState);  // Toggle help modal
  };

  // If user data is not available yet
  if (!user.username) {
    return <p>Loading...</p>;
  }

  // Sample data for booking stats
  const activeBooking = "2";
  const totalBookings = 12;
  const totalSuccess = 10;
  const totalFailed = 2;

  return (
    <div className="ml-0 md:ml-[6%] 2xl:ml-[15%] space-y-6 text-white">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-center py-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold">Welcome to Trah's Trucks Booking Page</h1>
      </div>

      {/* User Info */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-extrabold text-center py-4 bg-yellow-500 text-gray-900 rounded-lg shadow-md">
          User Name: {user.username}
        </h2>
      </div>

      {/* Currently Active Booking */}
      <div className="bg-gradient-to-r from-green-500 to-teal-400 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">Currently Active Booking:</h3>
        <p className="text-lg mt-2">{activeBooking}</p>
      </div>

      {/* Booking Statistics */}
      <div className="bg-gradient-to-r from-orange-500 to-red-400 p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-bold">Booking Statistics</h3>
        <p>Total Number of Bookings: <strong>{totalBookings}</strong></p>
        <p>Total Successful Bookings: <strong>{totalSuccess}</strong></p>
        <p>Total Failed Bookings: <strong>{totalFailed}</strong></p>
      </div>

      {/* Full-Width Buttons */}
      <div className="space-y-4">
        {/* Help Button */}
        <button onClick={handleBookingHelp} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full flex items-center justify-center">
          <FiHelpCircle className="mr-2" size={24} />
          Help
        </button>
        {isBookingHelpOpen && <BookingHelp closeModal={() => setIsBookingHelpOpen(false)} />}

        {/* Sign Out Button */}
        <button onClick={handleSignOut} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full flex items-center justify-center">
          <FiLogOut className="mr-2" size={24} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default BookingProfile;
