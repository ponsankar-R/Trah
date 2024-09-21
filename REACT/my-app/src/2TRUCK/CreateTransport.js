import React, { useState } from 'react';

export default function CreateTransport({ onClose }) {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const locations = [
    'Pune', 'Hyderabad', 'Kolkata', 'Nagpur', 'Jaipur',
    'Surat', 'Chandigarh', 'Agra', 'Vadodara', 'Guwahati'
  ];

  const truckNames = [
    'TN10AA1234', 'TN20BB5678', 'KA05MR9090', 'MH12XY4321', 
    'DL08XZ2345', 'TN55CC9876', 'TN11YY5432', 'RJ14ZZ9999',
    'AP16DD7890', 'TN09EE2468'
  ];

  const handleLocationChange = (setter, value) => {
    if ((value === toLocation && setter === setFromLocation) ||
        (value === fromLocation && setter === setToLocation)) {
      alert("From and To locations cannot be the same");
    } else {
      setter(value);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-center text-2xl font-semibold mb-6">Make New Transportation</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Truck Name:</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none">
            {truckNames.map((truck, idx) => (
              <option key={idx} value={truck}>{truck}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">From Location:</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            value={fromLocation}
            onChange={(e) => handleLocationChange(setFromLocation, e.target.value)}
          >
            <option value="">Select a city</option>
            {locations.map((location, idx) => (
              <option key={idx} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">To Location:</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            value={toLocation}
            onChange={(e) => handleLocationChange(setToLocation, e.target.value)}
          >
            <option value="">Select a city</option>
            {locations.map((location, idx) => (
              <option key={idx} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">From Date:</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">To Date:</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:bg-red-600 active:bg-red-500 rounded px-2 "
        >
          &#10005;
        </button>

        {/* Submit Button (Non-functional for now) */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
