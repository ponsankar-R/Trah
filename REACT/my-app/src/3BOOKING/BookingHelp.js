import React, { useState, useEffect } from 'react';

export default function BookingHelp() {
  const [isOpen, setIsOpen] = useState(true); // Default to open

  // Prevent background scroll when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable background scroll
    } else {
      document.body.style.overflow = ''; // Re-enable background scroll
    }
    return () => {
      document.body.style.overflow = ''; // Ensure scroll is enabled if the component unmounts
    };
  }, [isOpen]);

  // Toggle modal open/close
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Render the modal only when it's open
  if (!isOpen) {
    return (
      <button
        onClick={openModal}
        className='fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg'>
        Open Help
      </button>
    );
  }

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='relative h-[80%] w-[90%] md:w-96 p-6 bg-white shadow-lg rounded-lg overflow-y-auto'>
        <button
          onClick={closeModal}
          className='absolute top-2 right-2 text-2xl font-bold text-gray-800'>
          ✖
        </button>
        <h2 className='text-center text-2xl font-semibold mb-4'>Welcome to Booking Help Center</h2>
        <ol className='list-decimal ml-5 text-lg text-gray-900'>
          <li className='mb-2'>
            <strong>This is the Home page:</strong> Here, you can view personalized truck recommendations based on your needs and preferences. You can explore different trucks suitable for your bookings.
          </li>
          <li className='mb-2'>
            <strong>What is the "Booked Truck" section?</strong> The "Booked Truck" section allows you to track the status of your booked trucks, including upcoming schedules and detailed booking information.
          </li>
          <li className='mb-2'>
            <strong>How do I receive notifications?</strong> After making a booking, you will receive notifications in the "Notification" section, such as when your booking is confirmed, canceled, or updated.
          </li>
          <li className='mb-2'>
            <strong>How can I access my profile?</strong> In the "Profile" section, you can view your account details, including statistics on your bookings, payment history, and personal preferences.
          </li>
          <li className='mb-2'>
            <strong>What happens if my booked truck is canceled after 1 hour?</strong> If your booked truck is canceled after 1 hour, you will need to pay 5% of the booked amount before you're allowed to book another truck.
          </li>
        </ol>
      </div>
    </div>
  );
}
