import React, { useState, useEffect } from 'react';

export default function CreateTransport({ onClose }) {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [trucks, setTrucks] = useState([]);

  const locations = [
    'Pune', 'Hyderabad', 'Kolkata', 'Nagpur', 'Jaipur',
    'Surat', 'Chandigarh', 'Agra', 'Vadodara', 'Guwahati'
  ];

  // Fetch user's trucks when the component mounts
  useEffect(() => {
    const fetchTrucks = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        alert('User not authenticated.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/user-trucks?ownerId=${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTrucks(data.trucks);
        } else {
          const errorResult = await response.json();
          alert(`Error: ${errorResult.message}`);
        }
      } catch (err) {
        console.error('Error fetching trucks:', err);
        alert('An error occurred while fetching trucks.');
      }
    };

    fetchTrucks();
  }, []);

  // State for selected truck
  const [selectedTruckId, setSelectedTruckId] = useState('');

  const handleLocationChange = (setter, value) => {
    if ((value === toLocation && setter === setFromLocation) ||
        (value === fromLocation && setter === setToLocation)) {
      alert("From and To locations cannot be the same");
    } else {
      setter(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('User not authenticated.');
      return;
    }

    if (!selectedTruckId || !fromLocation || !toLocation || !fromDate || !toDate) {
      alert('Please fill in all the required fields.');
      return;
    }

    const transportData = {
      ownerId: user.id,
      truckId: selectedTruckId,
      fromLocation,
      toLocation,
      fromDate,
      toDate,
    };

    try {
      const response = await fetch('http://localhost:5000/transports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transportData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        onClose(); // Close the form
      } else {
        const errorResult = await response.json();
        alert(`Error: ${errorResult.message}`);
      }
    } catch (err) {
      console.error('Error creating transport:', err);
      alert('An error occurred while creating the transport.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-center text-2xl font-semibold mb-6">Make New Transportation</h2>

        <form onSubmit={handleSubmit}>
          {/* Truck Selection */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Truck Name:</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              value={selectedTruckId}
              onChange={(e) => setSelectedTruckId(e.target.value)}
            >
              <option value="">Select a truck</option>
              {trucks.map((truck) => (
                <option key={truck._id} value={truck._id}>
                  {truck.truckName}
                </option>
              ))}
            </select>
          </div>

          {/* From Location */}
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

          {/* To Location */}
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

          {/* From Date */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">From Date:</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* To Date */}
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
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:bg-red-600 active:bg-red-500 rounded px-2 "
          >
            &#10005;
          </button>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
