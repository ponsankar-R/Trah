import React, { useState } from 'react';
import './Form.css';
import { BsTruckFlatbed } from "react-icons/bs";
import { PiTruckFill } from "react-icons/pi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 

export default function Form({ formType, formBackendType }) {
  // State variables for animations and password visibility
  const [animateTruck, setAnimateTruck] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ userName: '', password: '', userType: '' });
  const [message, setMessage] = useState('');

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle form data updates
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, password } = formData;
    const userType = formBackendType === 'TR' || formBackendType === 'TL' ? 'Truck Owner' : 'Booker';

    if (userName && password) {
      setAnimateTruck(true);
      setTimeout(() => {
        setAnimateTruck(false);
      }, 1000);

      try {
        // Send the data to the back-end with the correct URL and field names
        const response = await fetch('http://localhost:5000/register', { // Update the URL as needed
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: userName, password, type: userType }), // Changed 'userType' to 'type'
        });

        const result = await response.json();
        if (response.ok) {
          setMessage('Registration successful');
          // Optionally, reset the form
          setFormData({ userName: '', password: '', userType: '' });
        } else {
          setMessage(`Error: ${result.message}`);
        }
      } catch (error) {
        setMessage('An unexpected error occurred.');
        console.error("Error during fetch:", error);
      }
    } else {
      setMessage('Please fill in all required fields.');
    }
  };

  return (
    <div id="LRform">
      <form id="LRformbody" onSubmit={handleSubmit}>
        <h1>{formType}</h1>

        <div className="inputGroup">
          <label htmlFor="userName">Enter Your Username</label>
          <input 
            id="userName" 
            type="text" 
            name='userName'
            value={formData.userName}
            onChange={handleFormData}
            required 
            maxLength={20} 
            minLength={2} 
            placeholder="Username"
          />
        </div>

        <div className="inputGroup passwordContainer">
          <label htmlFor="password">Enter Your Password</label>
          <input 
            id="password" 
            type={passwordVisible ? "text" : "password"} 
            name='password'
            value={formData.password}
            onChange={handleFormData}
            required 
            maxLength={12} 
            minLength={8} 
            placeholder="Password"
          />
          <span 
            onClick={togglePasswordVisibility} 
            className="passwordToggleIcon" 
            aria-label={passwordVisible ? "Hide password" : "Show password"}
          >
            {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {/* User type is determined by formBackendType and displayed here */}
        <div className="inputGroup">
          <label>User Type: </label>
          <input 
            type="text" 
            name="userType"
            value={formBackendType === 'TR' || formBackendType === 'TL' ? 'Truck Owner' : 'Booker'}
            disabled 
          />
        </div>

        <div id="enterContainer">
          <button id="enterForm" type="submit">
            <BsTruckFlatbed id="emptyTruckIcon" className={animateTruck ? 'animate' : ''} />
            GO
            <PiTruckFill id="fullTruckIcon" />
          </button>
        </div>

        {/* Display success/error message */}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
