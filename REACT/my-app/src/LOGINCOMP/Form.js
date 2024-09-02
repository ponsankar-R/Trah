import React, { useState } from 'react';
import './Form.css';
import { BsTruckFlatbed } from "react-icons/bs";
import { PiTruckFill } from "react-icons/pi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 


//formType is passed as prop from loginTypePage 
//formBackendType for better handling backend logic ,see LoginTypePage.js for better understanding what it holds

export default function Form({ formType ,formBackendType}) {

  //state variable for truck animation on submit button
  const [animateTruck, setAnimateTruck] = useState(false);
  //state variable for 'eye' icon in password to toggle eye open and close and password
  const [passwordVisible, setPasswordVisible] = useState(false);
  //state variable for maintaining enterd values in form
  const [formData, setFormData] = useState({ userName: '', password: '' });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //handling live form data and update in state varable
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //handling both data and animation ,onsubmit set user name and 
  const handleSubmit = (e) => {
    e.preventDefault();
    //destructuring form data and store into variables 
    const { userName, password } = formData;

    if (userName && password) {

      setAnimateTruck(true);
      setTimeout(() => {
        setAnimateTruck(false);
      }, 1000);
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

        <div id="enterContainer">
          <button id="enterForm" type="submit">
            <BsTruckFlatbed id="emptyTruckIcon" className={animateTruck ? 'animate' : ''} />
            GO
            <PiTruckFill id="fullTruckIcon" />
          </button>
        </div>
      </form>
    </div>
  );
}
