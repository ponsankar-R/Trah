import React, { useState, useEffect } from 'react';
import { FaTruck, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';
import CreateTransport from './CreateTransport';

function ActiveTrucks() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isNewTransportFormOpen, setIsNewTransportFormOpen] = useState(false);
  const [transports, setTransports] = useState([]);
  const [selectedTransportIndex, setSelectedTransportIndex] = useState(null);

  const handleInfoToggle = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  const handleNewTransport = () => {
    setIsNewTransportFormOpen(true);
  };

  useEffect(() => {
    const fetchTransports = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        alert('User not authenticated.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/transports?ownerId=${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTransports(data.transports);
          console.log("Transport data", data);
        } else {
          const errorResult = await response.json();
          alert(`Error: ${errorResult.message}`);
        }
      } catch (err) {
        console.error('Error fetching transports:', err);
        alert('An error occurred while fetching transports.');
      }
    };

    fetchTransports();
  }, [isNewTransportFormOpen]);

  return (
    <div className='md:ml-[7%] lg:ml-[9%] p-6 relative'>
      {transports.length > 0 ? (
        transports.map((transport, index) => {
          // Check if transport.truck is defined before accessing its properties
          const truck = transport.truck || {}; // Default to an empty object if truck is null

          return (
            <div
              key={transport._id}
              className='relative bg-gradient-to-r from-blue-100 to-purple-200 shadow-lg rounded-lg p-8 w-full max-w-md mb-8'
            >
              {/* Truck Name Section */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg p-3 rounded-lg border-2 border-indigo-600 mb-6 text-center">
                <FaTruck className="inline-block mr-2" /> Truck Name: {truck.truckName || 'N/A'}
              </div>

              {/* From/To Section */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-lg shadow-md">
                  <h3 className="text-white flex items-center font-semibold">
                    <FaMapMarkerAlt className="mr-2" /> From:
                  </h3>
                  <p className="font-bold">{transport.fromLocation}</p>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-teal-400 text-white p-4 rounded-lg shadow-md">
                  <h3 className="text-white flex items-center font-semibold">
                    <FaMapMarkerAlt className="mr-2" /> To:
                  </h3>
                  <p className="font-bold">{transport.toLocation}</p>
                </div>
              </div>

              {/* Status Section */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-semibold mb-1">Status:</h3>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-bold shadow-lg">
                  <p className="text-center text-lg">{transport.status}</p>
                </div>
              </div>

              {/* Date Section */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-semibold mb-1">Date:</h3>
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 rounded-lg shadow-lg">
                  <div className="flex justify-between">
                    <div className="mr-4">
                      <p className="font-medium">From:</p>
                      <p className="font-bold">{new Date(transport.fromDate).toLocaleDateString()}</p>
                    </div>
                    <div className="border-l border-white h-10 mx-2"></div> {/* Divider */}
                    <div className="ml-4">
                      <p className="font-medium">To:</p>
                      <p className="font-bold">{new Date(transport.toDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount Section */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-semibold mb-1">Amount:</h3>
                <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white p-4 rounded-lg shadow-lg">
                  <p className="font-bold">₹{transport.amount || 'N/A'}</p>
                </div>
              </div>

              {/* Info Button */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    setSelectedTransportIndex(index);
                    handleInfoToggle();
                  }}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full shadow-lg"
                >
                  Truck Info
                </button>
              </div>

              {/* Modal/Popup for Truck Info */}
              {isInfoOpen && selectedTransportIndex === index && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-2xl max-w-lg mx-auto">
                    <h4 className="text-xl font-semibold mb-4 text-center text-indigo-600">Truck Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-gray-700 font-medium">Type:</div>
                      <div className="font-bold text-gray-900">{truck.truckType || 'N/A'}</div>

                      <div className="text-gray-700 font-medium">Capacity:</div>
                      <div className="font-bold text-gray-900">{truck.truckCapacity || 'N/A'} kg</div>

                      <div className="text-gray-700 font-medium">Driver:</div>
                      <div className="font-bold text-gray-900">{truck.driverName || 'N/A'}</div>

                      <div className="text-gray-700 font-medium">Contact:</div>
                      <div className="font-bold text-gray-900">{truck.truckContact || 'N/A'}</div>
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
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No active transports available.</p>
      )}

      {/* Button for Adding New Travel */}
      <button
        className="fixed bottom-14 right-6 md:bottom-8 md:right-8 bg-transparent text-green-500 border border-green-500 p-3 rounded-full z-50 hover:bg-green-500 hover:text-white transition duration-300 flex items-center justify-center shadow-lg"
        onClick={handleNewTransport}
      >
        <FaPlus className="text-2xl" />
      </button>

      {isNewTransportFormOpen && (
        <CreateTransport onClose={() => setIsNewTransportFormOpen(false)} />
      )}
    </div>
  );
}

export default ActiveTrucks;
