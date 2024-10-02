import React, { useState, useEffect } from 'react';
import { BsPlusCircle } from "react-icons/bs"; // Icon for add button
import AddTruckContainer from './AddTruckContainer';

function Trucks() {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null);     // For handling errors

  // State variable for showing add truck container
  const [showAddTruckContainer, setShowAddTruckContainer] = useState(false);

  // Function for handling add new truck
  const handleAddNewTruck = () => {
    setShowAddTruckContainer(true);
  };

  const fetchTrucks = async () => {
    // Retrieve user information from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('User not authenticated.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/trucks?ownerId=${user.id}`, {
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
        setError(errorResult.message);
      }
    } catch (err) {
      console.error('Error fetching trucks:', err);
      setError('An error occurred while fetching trucks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  // Refetch trucks when a new truck is added
  useEffect(() => {
    if (!showAddTruckContainer) {
      fetchTrucks();
    }
  }, [showAddTruckContainer]);

  if (loading) {
    return <div className="md:ml-[7%] p-4">Loading...</div>;
  }

  if (error) {
    return <div className="md:ml-[7%] p-4">Error: {error}</div>;
  }

  return (
    <div className="md:ml-[7%] p-4 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h4 className="text-lg font-bold mb-2 md:mb-0">
          Total No Of Trucks: <span className="text-green-600">{trucks.length}</span>
        </h4>
      </div>

      {/* Truck Details Section */}
      {trucks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 mb-16">
          {trucks.map((truck, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h1 className="text-2xl font-semibold mb-2">
                Truck Name: <span className="text-blue-600">{truck.truckName}</span>
              </h1>
              <h2 className="text-lg mb-2">
                Driver: <span className="text-gray-700">{truck.driverName}</span>
              </h2>
              <h3 className="text-lg mb-2">
                Truck Max Capacity: <span className="text-gray-700">{truck.truckCapacity} kg</span>
              </h3>
              <h3 className="text-lg mb-2">
                Truck Type: <span className="text-gray-700">{truck.truckType}</span>
              </h3>
              <h3 className="text-lg mb-2">
                Contact: <span className="text-gray-700">{truck.truckContact}</span>
              </h3>
              {/* Adjust status display based on your data if needed */}
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-16">No trucks available.</div>
      )}

      {/* Add truck button (floating at the bottom-right) */}
      <button onClick={handleAddNewTruck} className="fixed top-14 right-4 bg-blue-600 text-white p-2 h-fit md:top-20 md:p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none">
        <BsPlusCircle className="text-3xl" />
      </button>

      {showAddTruckContainer && (
        <AddTruckContainer setAddTruckContainer={setShowAddTruckContainer} />
      )}
    </div>
  );
}

export default Trucks;
