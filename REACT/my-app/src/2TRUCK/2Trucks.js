import React, { useState } from 'react';
import { BsPlusCircle } from "react-icons/bs"; // Icon for add button
import AddTruckContainer from './AddTruckContainer';

function Trucks() {
  //state variable for showing addd truck container 
  const [showAddTruckContainer,setShowAddTruckContainer]=useState(false);
  const truckData = [
    {
      truckName: 'TN47AV9977',
      driver: 'ABC',
      capacity: '12000kg',
      status: 'Verified'
    },
    {
      truckName: 'TN48XY9988',
      driver: 'XYZ',
      capacity: '10000kg',
      status: 'Under Verification'
    }
  ];

  //function for handling add new truck
  const handleAddNewTruck=()=>{
    setShowAddTruckContainer(true);

  }


  return (
    <div className="md:ml-[7%] p-4 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h4 className="text-lg font-bold mb-2 md:mb-0">
          Total No Of Trucks (verified): <span className="text-green-600">25</span>
        </h4>
        <h4 className="text-lg font-bold">
          Trucks Under Verification: <span className="text-orange-500">5</span>
        </h4>
      </div>

      {/* Truck Details Section */}
      <div className="grid grid-cols-1 gap-6 mb-16">
        {truckData.map((truck, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h1 className="text-2xl font-semibold mb-2">
              Truck Name: <span className="text-blue-600">{truck.truckName}</span>
            </h1>
            <h2 className="text-lg mb-2">
              Driver: <span className="text-gray-700">{truck.driver}</span>
            </h2>
            <h3 className="text-lg mb-2">
              Truck Max Capacity: <span className="text-gray-700">{truck.capacity}</span>
            </h3>
            <h3 className="text-lg">
              Status: <span className={`font-bold ${truck.status === 'Verified' ? 'text-green-600' : 'text-orange-500'}`}>
                {truck.status}
              </span>
            </h3>
          </div>
        ))}
      </div>

      {/* Add truck button (floating at the bottom-right) */}
      <button onClick={handleAddNewTruck} className="fixed top-14 right-4 bg-blue-600 text-white p:2 h-fit md:top-20 md:p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none">
        <BsPlusCircle className="text-3xl" />
      </button>
       {showAddTruckContainer && (
        <AddTruckContainer setAddTruckContainer={setShowAddTruckContainer} />
      )}
      
    </div>
  );
}

export default Trucks;
