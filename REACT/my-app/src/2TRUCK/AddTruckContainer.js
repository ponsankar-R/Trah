import React, { useState } from 'react';

function AddTruckContainer({ setAddTruckContainer }) {
  const [truckName, setTruckName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [truckCapacity, setTruckCapacity] = useState('');
  const [truckType,setTruckType]=useState('');
  const [truckContact,setTruckContact]=useState('');

  const handleTruckAddCancelButton = () => {
    setAddTruckContainer(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!truckName || !driverName || !truckCapacity) {
      alert('Please fill in all the required fields');
      return;
    }
  
    // Retrieve user information from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('User not authenticated.');
      return;
    }
  
    const truckData = { 
      truckName, 
      driverName, 
      truckCapacity, 
      truckType, 
      truckContact,
      ownerId: user.id, // Include ownerId in the data
    };
  
    try {
      const response = await fetch('http://localhost:5000/trucks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(truckData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
  
        // Reset fields after submission
        setTruckName('');
        setDriverName('');
        setTruckCapacity('');
        setTruckType('');
        setTruckContact('');
  
        setAddTruckContainer(false);
      } else {
        const errorResult = await response.json();
        alert(`Error: ${errorResult.message}`);
      }
    } catch (error) {
      console.error('Error adding truck:', error);
      alert('An error occurred while adding the truck.');
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <button
          onClick={handleTruckAddCancelButton}
          className="flex float-end bg-red-600 text-white text-2xl hover:bg-red-900 rounded-xl py-1 px-2 mb-4"
          aria-label="Close"
        >
          X
        </button>
        <h2 className="text-xl font-semibold text-center mb-4 select-none">Add New Truck</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Truck Name:"
            value={truckName}
            onChange={(e) => setTruckName(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Driver Name:"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Truck Maximum Capacity:"
            type="number"
            min='0'
            value={truckCapacity}
            onChange={(e) => setTruckCapacity(e.target.value)}
          />
          <input 
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type Of The Truck :ex:10 Wheeler"
            type="text"
            value={truckType}
            onChange={(e)=> setTruckType(e.target.value)}
          />
          <input  
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contact Number :"
            type="number"
            min='0'
            value={truckContact}
            onChange={(e)=>setTruckContact(e.target.value)}
            />
            

          <button
  
            type="submit"
            className="w-fit bg-green-800 text-center text-lg text-white rounded-xl p-2 m-[32%] font-bold hover:bg-blue-700 select-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTruckContainer;
