import React, { useState, useContext } from 'react';
import './Form.css';
import { BsTruckFlatbed } from "react-icons/bs";
import { PiTruckFill } from "react-icons/pi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 
import { PanelContext } from '../App';

export default function Form({formTypes}) {
  // Reciving "whereToGoNext" state function for changing panel
  const setWhereToGoNext = useContext(PanelContext);

  // State variable for truck animation on submit button
  const [animateTruck, setAnimateTruck] = useState(false);

  // State variable for 'eye' icon in password to toggle eye open and close
  const [passwordVisible, setPasswordVisible] = useState(false);

  // State variable for maintaining entered values in form
  const [formData, setFormData] = useState({ userName: '', password: '' });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handling live form data and updating state variable
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handling both data and animation on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Destructuring form data and storing into variables 
    const { userName, password } = formData;

    if (userName && password) {
      setAnimateTruck(true);
      setTimeout(() => {
        setAnimateTruck(false);
      }, 1000);

      // Routing based on formTypes after successful submission
      if (formTypes[1] === 'TL' || formTypes[1] === 'TR') {
        setWhereToGoNext("truck");
      } else if (formTypes[1] === 'BL' || formTypes[1] === 'BR') {
        setWhereToGoNext("booking");
      }
    }
  };

  return (
    <div id="LRform">
      <form id="LRformbody" onSubmit={handleSubmit}>
        <h1 id="formType">{formTypes[0]}</h1>

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
