import React, { useState } from 'react';
import { FaTruck, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';
import CreateTransport from './CreateTransport';


function ActiveTrucks() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isNewTrasportFormOpen ,setIsNewTransportFormOpen]=useState(false);

  const handleInfoToggle = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  const handleNewTransport=()=>{
    setIsNewTransportFormOpen(true)
  }

  return (
    <div className='md:ml-[7%] lg:ml-[9%] p-6 relative'>
      <div className='relative bg-gradient-to-r from-blue-100 to-purple-200 shadow-lg rounded-lg p-8 w-full max-w-md   content-container pb-16 md:pb-0'>
        
        {/* Truck Name Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg p-3 rounded-lg border-2 border-indigo-600 mb-6 text-center">
          <FaTruck className="inline-block mr-2" /> Truck Name: TN47AV9999
        </div>

        {/* From/To Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-white flex items-center font-semibold">
              <FaMapMarkerAlt className="mr-2" /> From:
            </h3>
            <p className="font-bold">Chennai</p>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-teal-400 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-white flex items-center font-semibold">
              <FaMapMarkerAlt className="mr-2" /> To:
            </h3>
            <p className="font-bold">Mumbai</p>
          </div>
        </div>

        {/* Status Section */}
        <div className="mb-6">
          <h3 className="text-gray-700 font-semibold mb-1">Status:</h3>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-bold shadow-lg">
            <p className="text-center text-lg">On Travel</p>
          </div>
        </div>

        {/* Date Section */}
        <div className="mb-6">
          <h3 className="text-gray-700 font-semibold mb-1">Date:</h3>
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <div className="mr-4">
                <p className="font-medium">From:</p>
                <p className="font-bold">12th Sep, 2024</p>
              </div>
              <div className="border-l border-white h-10 mx-2"></div> {/* Divider */}
              <div className="ml-4">
                <p className="font-medium">To:</p>
                <p className="font-bold">15th Sep, 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Amount Section */}
        <div className="mb-6">
          <h3 className="text-gray-700 font-semibold mb-1">Amount:</h3>
          <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white p-4 rounded-lg shadow-lg">
            <p className="font-bold">₹20,000</p>
          </div>
        </div>

        {/* Info Button */}
        <div className="mt-4">
          <button
            onClick={handleInfoToggle}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full shadow-lg"
          >
            Truck Info
          </button>
        </div>

        {/* Modal/Popup for Truck Info */}
        {isInfoOpen && (
          <div className="absolute top-0 left-0 right-0 mt-8 p-6 bg-white border border-gray-300 rounded-lg shadow-2xl z-20 max-w-lg mx-auto">
            <h4 className="text-xl font-semibold mb-4 text-center text-indigo-600">Truck Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-700 font-medium">Type:</div>
              <div className="font-bold text-gray-900">18-Wheeler</div>

              <div className="text-gray-700 font-medium">Capacity:</div>
              <div className="font-bold text-gray-900">30 Tons</div>

              <div className="text-gray-700 font-medium">Driver:</div>
              <div className="font-bold text-gray-900">ABC</div>

              <div className="text-gray-700 font-medium">Contact:</div>
              <div className="font-bold text-gray-900">9876543210</div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleInfoToggle}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Button for Adding New Travel */}
      <button
        className="fixed bottom-14 right-6 md:bottom-8 md:right-8 bg-transparent text-green-500 border border-green-500 p-3 rounded-full z-50 hover:bg-green-500 hover:text-white transition duration-300 flex items-center justify-center shadow-lg"
        onClick={handleNewTransport}
      >
        <FaPlus className="text-2xl" />
      </button>

      {isNewTrasportFormOpen && <CreateTransport onClose={() =>setIsNewTransportFormOpen(false)} />}
     

      
    </div>
  );
}

export default ActiveTrucks;
