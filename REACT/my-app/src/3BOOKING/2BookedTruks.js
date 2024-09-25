import React, { useState } from 'react';
import { FaTruck, FaInfoCircle } from 'react-icons/fa'; // Icons from react-icons
import { IoEllipsisVertical, IoCloseSharp } from 'react-icons/io5'; // More options & close icon

function BookedTrucks() {
  const [showInfo, setShowInfo] = useState(null); // Track which truck info is displayed
  const [showOptions, setShowOptions] = useState(null); // Track which options menu is open

  // Mock backend data
  const bookedData = [
    {
      id: 1,
      truckName: 'Truck A',
      from: 'Location A',
      to: 'Location B',
      fromDate: '2024-10-01',
      toDate: '2024-10-02',
      amount: 1000,
      status: 'booked', // Could be 'booked', 'canceled', 'completed'
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
      status: 'completed',
      truckInfo: {
        type: 'Refrigerated',
        capacity: '5 tons',
        driver: 'Jane Smith',
        contact: '987-654-3210'
      }
    },
    {
      id: 3,
      truckName: 'Truck C',
      from: 'Location E',
      to: 'Location F',
      fromDate: '2024-10-09',
      toDate: '2024-10-12',
      amount: 2000,
      status: 'canceled',
      truckInfo: {
        type: 'Tanker',
        capacity: '15 tons',
        driver: 'Sam Wilson',
        contact: '555-444-3333'
      }
    }
  ];

  // Toggle truck info display
  const handleInfoClick = (id) => {
    setShowInfo(showInfo === id ? null : id); // Toggle the info popup
  };

  // Toggle options menu display
  const handleOptionsClick = (id) => {
    setShowOptions(showOptions === id ? null : id); // Toggle options menu
  };

  // Color classes for status badges
  const getStatusClass = (status) => {
    switch (status) {
      case 'booked':
        return 'bg-blue-200 text-blue-700';
      case 'completed':
        return 'bg-green-200 text-green-700';
      case 'canceled':
        return 'bg-red-200 text-red-700';
      default:
        return '';
    }
  };

  return (
    <div className='ml-4 md:ml-[7%] 2xl:ml-[15%] space-y-6'>
      {bookedData.map((booking) => (
        <div key={booking.id} className="border border-gray-300 shadow-lg p-6 rounded-lg bg-white relative space-y-4 transition duration-300 ease-in-out">
          
          {/* Top Section: Truck Name and Options */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaTruck className="text-indigo-600 text-2xl" />
              <h2 className="text-xl font-bold text-gray-800">{booking.truckName}</h2>
            </div>

            {/* Options Icon */}
            <button onClick={() => handleOptionsClick(booking.id)} className="text-gray-600 hover:text-gray-800 relative">
              <IoEllipsisVertical size={24} />
            </button>
            {/* Options Dropdown */}
            {showOptions === booking.id && (
              <div className="absolute top-10 right-2 bg-white shadow-md p-2 rounded-lg z-10 border border-gray-200">
                <button className="block text-left text-gray-700 hover:text-gray-900 px-4 py-2 w-full">Cancel Booking</button>
                <button className="block text-left text-gray-700 hover:text-gray-900 px-4 py-2 w-full">Update Booking</button>
              </div>
            )}
          </div>

          {/* Truck Info */}
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

          {/* Status Badge */}
          <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getStatusClass(booking.status)}`}>
            {booking.status}
          </div>

          {/* Truck Info Icon */}
          <div className="flex justify-end mt-4">
            <button onClick={() => handleInfoClick(booking.id)} className="text-indigo-600 hover:text-indigo-800">
              <FaInfoCircle size={24} />
            </button>
          </div>

          {/* Floating Truck Info */}
          {showInfo === booking.id && (
            <div className="absolute top-16 right-0 bg-white text-gray-800 p-6 rounded-lg shadow-xl z-10 w-[90%] md:w-[40%] border border-gray-300">
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

export default BookedTrucks;
