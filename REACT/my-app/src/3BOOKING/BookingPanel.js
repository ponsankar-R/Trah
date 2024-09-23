import React, { useState } from 'react'
import BookNavBar from './BookNavBar'
import BookingHome from './1BookingHome';
import BookedTruks from './2BookedTruks';
import BookingProfile from './4BookingProfile';

function BookingPanel() {
  const [bookingNavigation ,setBookingNavigation]=useState('bookingHome');
  return (
    <div>
      <h1 className='text-center bg-blue-700  text-white font-extrabold text-4xl pointer-events-none '>TRAH</h1>
            {
              (bookingNavigation==='bookingHome')?(<BookingHome />):(bookingNavigation==='bookedTrucks')?(<BookedTruks />):(bookingNavigation==='bookingNotification')?(<bookingNotification />):(bookingNavigation==='bookingProfile')?(<BookingProfile />):(<></>)
            }
            <BookNavBar setBookingNavigation={setBookingNavigation}/>
    </div>
  )
}

export default BookingPanel
