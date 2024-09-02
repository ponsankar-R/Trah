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
    const [formBackendType,setFormBackendType]=useState(0);

    // General function for handling form display and type setting
    const handleForm = (type,backendType)=> {
        setShowForm(true);
        setFormType(type);
        setFormBackendType(backendType);
        //TL =truck login  || BL = booker Login || TR = Truck Register || BR =booker register
    };

    return (
        <div id="loginTypePage">
            <h1 id='appName'>TRAH</h1>
            <div>
                {loginData === "login" ? (
                    <div className='userTypeButtons'>
                        <button id="truckL" className='typeButton' onClick={() => handleForm('Login As Truck Owner','TL')}>
                            <PiTruckTrailer className="truck" /> Login as Truck Owner
                        </button>
                        <button id="bookerL" className='typeButton' onClick={() => handleForm('Login For Truck Booking','BL')}>
                            <FaHandsHelping className='book' /> Book a Truck
                        </button>
                    </div>
                ) : (
                    <div className='userTypeButtons'>
                        <button id="truckR" className='typeButton' onClick={() => handleForm('Register As Truck Owner','TR')}>
                            <PiTruckTrailer className="truck" /> Register as Truck Owner
                        </button>
                        <button id="bookerR" className='typeButton' onClick={() => handleForm('Register For Booking Truck','BR')}>
                            <FaHandsHelping className='book' /> Register For Booking Truck
                        </button>
                    </div>
                )}
            </div>
            {showForm && <Form formType={[formType,formBackendType]} />} {/* Passed 'formType' as prop */}
        </div>
    );
}
