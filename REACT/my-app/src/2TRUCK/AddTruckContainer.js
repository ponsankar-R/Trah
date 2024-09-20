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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example validation
    if (!truckName || !driverName || !truckCapacity) {
      alert('Please fill in all the fields');
      return;
    }

    // You can now handle the data, e.g., send it to a backend
    console.log({ truckName, driverName, truckCapacity });

    // Reset fields after submission
    setTruckName('');
    setDriverName('');
    setTruckCapacity('');
    setAddTruckContainer(false);
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
