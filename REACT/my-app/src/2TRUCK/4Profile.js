import React from 'react';
import { FaTruck, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';  // Icons for the profile page
import { MdLocalShipping } from 'react-icons/md';

function Profile() {
  return (
    <div className='md:ml-[7%] p-6 bg-gray-100 min-h-screen'>
      {/* Profile Section */}
      <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
        <h1 className='text-3xl font-bold mb-4'>ABC Transportation</h1>
        <p className='text-gray-600 text-xl'>Managing Trucks and Shipments</p>
      </div>

      {/* Truck Statistics Section */}
      <div className='space-y-6'>
        <div className='bg-white rounded-lg shadow-md p-6 flex items-center'>
          <FaTruck className='text-4xl text-blue-500 mr-4' />
          <h2 className='text-lg font-semibold'>Total Number of Trucks: <span className='font-normal'>27</span></h2>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 flex items-center'>
          <MdLocalShipping className='text-4xl text-green-500 mr-4' />
          <h2 className='text-lg font-semibold'>Active Trucks: <span className='font-normal'>20</span></h2>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 flex items-center'>
          <FaTruck className='text-4xl text-red-500 mr-4' />
          <h2 className='text-lg font-semibold'>Inactive Trucks: <span className='font-normal'>7</span></h2>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 flex items-center'>
          <MdLocalShipping className='text-4xl text-purple-500 mr-4' />
          <h2 className='text-lg font-semibold'>Total Transportations Made: <span className='font-normal'>250</span></h2>
        </div>
      </div>

      {/* Buttons Section */}
      <div className='mt-12 space-y-4'>
        <button className='w-full flex items-center justify-center bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200'>
          <FaQuestionCircle className='mr-2 text-lg' />
          Help
        </button>

        <button className='w-full flex items-center justify-center bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200'>
          <FaSignOutAlt className='mr-2 text-lg' />
          Sign Out
        </button>
        <br>
        </br>
        <br></br>

      </div>
    </div>
  );
}

export default Profile;
