import React, { useState } from 'react';
import { FaTruck, FaInfoCircle } from 'react-icons/fa'; // Using react-icons for truck info
import { IoCloseSharp } from 'react-icons/io5'; // Close icon from react-icons

function BookingHome() {
  const [showInfo, setShowInfo] = useState(null); // Track which truck info is being displayed

  // Mock backend data
  const bookingData = [
    {
      id: 1,
      truckName: 'Truck A',
      from: 'Location A',
      to: 'Location B',
      fromDate: '2024-10-01',
      toDate: '2024-10-02',
      amount: 1000,
      truckInfo: {
        type: 'Flatbed',
        capacity: '10 tons',
        driver: 'John Doe',
        contact: '123-456-7890'
      }
    },
    {
      id: 2,
      truckName: 'Truck B',
      from: 'Location C',
      to: 'Location D',
      fromDate: '2024-10-05',
      toDate: '2024-10-07',
      amount: 1500,
      truckInfo: {
        type: 'Refrigerated',
        capacity: '5 tons',
        driver: 'Jane Smith',
        contact: '987-654-3210'
      }
    }
  ];

  // Handle the info icon click to show detailed info
  const handleInfoClick = (id) => {
    setShowInfo(showInfo === id ? null : id); // Toggle the popup for the clicked truck
  };

  return (
    <div className="ml-4 md:ml-[7%] 2xl:ml-[15%] space-y-6">
      {bookingData.map((booking) => (
        <div key={booking.id} className="border border-gray-300 shadow-lg p-6 rounded-lg bg-white relative space-y-4 transition duration-300 ease-in-out">
          {/* Main content of each truck */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaTruck className="text-indigo-600 text-2xl" />
              <h2 className="text-xl font-bold text-gray-800">{booking.truckName}</h2>
            </div>
            <button onClick={() => handleInfoClick(booking.id)} className="text-indigo-600 hover:text-indigo-800">
              <FaInfoCircle size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="bg-indigo-50 p-3 rounded-md">
              <p className="text-sm font-semibold text-gray-500">From</p>
              <p className="text-lg">{booking.from}</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-md">
              <p className="text-sm font-semibold text-gray-500">To</p>
              <p className="text-lg">{booking.to}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-md">
              <p className="text-sm font-semibold text-gray-500">From Date</p>
              <p className="text-lg">{booking.fromDate}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-md">
              <p className="text-sm font-semibold text-gray-500">To Date</p>
              <p className="text-lg">{booking.toDate}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-md col-span-2">
              <p className="text-sm font-semibold text-gray-500">Amount</p>
              <p className="text-xl font-bold">${booking.amount}</p>
            </div>
          </div>

          {/* "Pick" button */}
          <div className="flex justify-end mt-4">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200">
              Pick
            </button>
          </div>

          {/* Floating container for truck info */}
          {showInfo === booking.id && (
            <div className="absolute top-12 right-0 bg-white text-gray-800 p-6 rounded-lg shadow-xl z-10 w-[90%] md:w-[40%] border border-gray-300">
              <button onClick={() => setShowInfo(null)} className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors duration-200">
                <IoCloseSharp size={24} />
              </button>
              <h3 className="text-lg font-semibold text-indigo-600 mb-4">Truck Information</h3>
              <div className="space-y-2">
                <p><strong>Type:</strong> {booking.truckInfo.type}</p>
                <p><strong>Capacity:</strong> {booking.truckInfo.capacity}</p>
                <p><strong>Driver:</strong> {booking.truckInfo.driver}</p>
                <p><strong>Contact:</strong> {booking.truckInfo.contact}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookingHome;
