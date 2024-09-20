import React from 'react';

function Notification() {

  const commonTrukNotificationStyleOuter = () => {
    return 'font-semibold text-orange-700 text-xs';
  };

  const commonTrukNotificationStyleInner = () => {
    return 'font-bold text-blue-500 text-xs';
  };

  return (
    <div className="md:ml-[7%]">
      {/* Notification */}
      <div className="flex items-center justify-between bg-white p-3 m-2 rounded-lg shadow-lg w-full max-w-sm border border-gray-200">
        
        <div className="flex flex-col space-y-1 text-xs">
          <h4 className="text-gray-700">
            <span className="font-semibold">Truck:</span> TN47XS7777
          </h4>
          <h4 className="text-gray-500">
            <span className="font-semibold">Date:</span> 15/09/24 - 17/09/24
          </h4>
          <h4 className={commonTrukNotificationStyleOuter()}>
            User: <span className={commonTrukNotificationStyleInner()}>Nambi Super Market</span>
          </h4>
          <h4 className={commonTrukNotificationStyleOuter()}>
            From: <span className={commonTrukNotificationStyleInner()}>Chennai</span>
          </h4>
          <h4 className={commonTrukNotificationStyleOuter()}>
            To: <span className={commonTrukNotificationStyleInner()}>Mumbai</span>
          </h4>
          <h4 className={commonTrukNotificationStyleOuter()}>
            Amount: <span className={commonTrukNotificationStyleInner()}>₹45000</span>
          </h4>
        </div>

        <div className="flex space-x-1">
          <button className="bg-blue-500 px-2 py-1 text-xs text-white rounded-md hover:bg-blue-600 transition duration-150">
            PICK
          </button>
          <button className="bg-red-500 px-2 py-1 text-xs text-white rounded-md hover:bg-red-600 transition duration-150">
            REJECT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
