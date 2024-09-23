import React, { useState } from 'react';
import TruckNavBar from './TruckNavBar';
import ActiveTrucks from './1ActiveTrucks';
import Trucks from './2Trucks';
import Notification from './3Notification';
import Profile from './4Profile';

export default function TRUCKHOME() {
  const [truckNavigation,setTruckNavigation]=useState("ActiveTripButton");
  
  

  return (
    <div className='relative h-screen '>
      <h1 className='text-center bg-blue-700  text-white font-extrabold text-4xl pointer-events-none '>TRAH</h1>
      <TruckNavBar setTruckNavigation={setTruckNavigation}/>
      {
        truckNavigation==="ActiveTripButton" ?(<ActiveTrucks />):(truckNavigation==="TruckButton")?(<Trucks/>):(truckNavigation==="NotificationButton")?(<Notification/>):(truckNavigation==="ProfileButton")?(<Profile />):(<></>)
      }
    </div>
  );
}
