import React, { useState, useEffect } from 'react';

export default function TruckHelp() {
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
      <div className='relative h-[80%] w-[90%] md:w-96 p-6 bg-slate-300 shadow-lg rounded-lg overflow-y-auto'>
        <button
          onClick={closeModal}
          className='absolute top-2 right-2 text-2xl font-bold text-gray-800'>
          ✖
        </button>
        <h2 className='text-center text-2xl font-semibold mb-4'>Welcome to Help Center</h2>
        <ol className='list-decimal ml-5 text-lg'>
          <li className='mb-2'>
            <strong>This is a panel for truck owners:</strong> Here, you can post your truck, and it will be verified by our Advanced AI model. After verification, you can create a transport that is recommended to multiple users based on certain criteria.
          </li>
          <li className='mb-2'>
            <strong>Why can't I determine the amount for my transport?</strong> You can't determine the amount yourself; it will be automatically assigned by our AI model after analyzing several factors, including current market trends.
          </li>
          <li className='mb-2'>
            <strong>What can I do on the first page?</strong> You can create a new transport on the first page, but it is essential to add your truck on the second page. After the truck is verified by our AI model, you will be able to create a transport with your verified trucks.
          </li>
          <li className='mb-2'>
            <strong>How can I cancel after picking up a deal?</strong> Unfortunately, after picking a deal, if 1 hour has passed, you will need to pay 5% of the total amount to the client. Only then will you be allowed to create the next transport.
          </li>
          <li>
            <strong>How can I pick up a deal?</strong> After creating a transport, if anyone picks your truck, you will receive a notification. You can either reject or pick that deal.
          </li>
        </ol>
      </div>
    </div>
  );
}
