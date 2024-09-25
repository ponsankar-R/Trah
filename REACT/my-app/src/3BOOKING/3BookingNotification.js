import React from 'react';
import { Link } from 'react-router-dom';

function BookingNotification() {
  // Mock notification data
  const notifications = [
    {
      id: 1,
      message: 'Your booking was successfully booked.',
      truckName: 'Truck A',
    },
    {
      id: 2,
      message: 'Your booking has been canceled.',
      truckName: 'Truck B',
    },
    {
      id: 3,
      message: 'Your booking is now complete.',
      truckName: 'Truck C',
    }
  ];

  return (
    <div className='ml-4 md:ml-[7%] 2xl:ml-[15%] space-y-6'>
      {notifications.map((notification) => (
        <div key={notification.id} className="border border-gray-300 shadow-md p-6 rounded-lg bg-white transition duration-300 ease-in-out">
          
          {/* Notification Message */}
          <p className="text-gray-700 text-md mb-2">
            {notification.message}
          </p>
          
          {/* Truck Name */}
          <p className="text-gray-600 text-sm mb-4">
            <strong>Truck Name:</strong> {notification.truckName}
          </p>
          
          {/* Constant Message with Link */}
          <p className="text-indigo-600 text-sm font-semibold">
            <Link >See more information at Booked Truck section</Link>
          </p>
        </div>
      ))}
    </div>
  );
}

export default BookingNotification;
