import React, { createContext, useState,useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './1LOGINCOMP/Login';
import TRUCKHOME from './2TRUCK/TruckHome';
import BookingPanel from './3BOOKING/BookingPanel';
import Profile from './2TRUCK/4Profile';
import BookedTrucks from './3BOOKING/2BookedTruks';
import BookingNotification from './3BOOKING/3BookingNotification';

export const PanelContext = createContext();
// import login_update from './backend/index.js';

function App() {
  const [whereToGoNext, setWhereToGoNext] = useState(false);
  const navigate = useNavigate();
  //here need to create a username state varible and need to pass state function to form component and need to get username depend on backend result


  // This effect watches whereToGoNext and navigates based on its value
    useEffect(() => {
    if (whereToGoNext === "truck") {
      navigate('/truck');
    } else if (whereToGoNext === "booking") {
      navigate('/booking');
    } else if (whereToGoNext === false) {
      navigate('/');
    }
  }, [whereToGoNext, navigate]);

  return (
    <PanelContext.Provider value={setWhereToGoNext}>
      <div>
        <Routes>
          {/* the route mentioned below all are the now child of this provider so only these childs can access provider  values */}
          <Route path='/' element={<Login />} />
          <Route path='/truck' element={<TRUCKHOME />} />
          <Route path='/booking' element={<BookingPanel/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/booking-notification" element={<BookingNotification />} />
          <Route path="/booked-trucks" element={<BookedTrucks />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </PanelContext.Provider>
  );
}

export default App;
