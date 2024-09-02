import React, { useContext, useState } from 'react';
import { LoginContext } from './Login'; 
import './LoginTypePage.css';
import { PiTruckTrailer } from "react-icons/pi";
import { FaHandsHelping } from "react-icons/fa";
import Form from './Form';

export default function LoginTypePage() {
    // Receiving data from login component
    const loginData = useContext(LoginContext);
    
    // State variables
    const [showForm, setShowForm] = useState(false); 
    const [formType, setFormType] = useState('');

    // General function for handling form display and type setting
    const handleForm = (type) => {
        setShowForm(true);
        setFormType(type);
    };

    return (
        <div id="loginTypePage">
            <h1 id='appName'>TRAH</h1>
            <div>
                {loginData === "login" ? (
                    <div className='userTypeButtons'>
                        <button id="truckL" className='typeButton' onClick={() => handleForm('Login As Truck Owner')}>
                            <PiTruckTrailer className="truck" /> Login as Truck Owner
                        </button>
                        <button id="bookerL" className='typeButton' onClick={() => handleForm('Login For Truck Booking')}>
                            <FaHandsHelping className='book' /> Book a Truck
                        </button>
                    </div>
                ) : (
                    <div className='userTypeButtons'>
                        <button id="truckR" className='typeButton' onClick={() => handleForm('Register As Truck Owner')}>
                            <PiTruckTrailer className="truck" /> Register as Truck Owner
                        </button>
                        <button id="bookerR" className='typeButton' onClick={() => handleForm('Register For Booking Truck')}>
                            <FaHandsHelping className='book' /> Register For Booking Truck
                        </button>
                    </div>
                )}
            </div>
            {showForm && <Form formType={formType} />} {/* Passed 'formType' as prop */}
        </div>
    );
}
