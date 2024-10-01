import React, { useContext, useState } from 'react';  // Import useContext, useState from React
import axios from 'axios';  // Import axios for making HTTP requests

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';  // Import icons from react-icons
import { BsTruckFlatbed } from 'react-icons/bs';
import { PiTruckFill } from 'react-icons/pi';  // Ensure this import is correct; check the library

import { PanelContext } from '../App.js';  // Import PanelContext from its appropriate file

export default function Form({ formTypes }) {
  const setWhereToGoNext = useContext(PanelContext);
  const [animateTruck, setAnimateTruck] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { username, password } = formData;
    const type = formTypes[1];
    
    if (username && password && type) {
      setAnimateTruck(true);
      try {
        let url;
        if (type.startsWith('TL') || type.startsWith('BL')) {
          url = 'http://localhost:5000/login';
        } else {
          url = 'http://localhost:5000/register';
        }

      
        const response = await axios.post(url, { username, password, type }, { withCredentials: true });

        if (response.status === 200 || response.status === 201) {
          setSuccess(response.data.message);
          setFormData({ username: '', password: '' });

          if (type === 'TL' || type === 'TR') {
            setWhereToGoNext("truck");
          } else if (type === 'BL' || type === 'BR') {
            setWhereToGoNext("booking");
          }
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else if (err.request) {
          setError("No response from server. Please try again later.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setAnimateTruck(false);
      }
    } else {
      setError("Please fill in all required fields.");
    }
  };

  return (
    <div id="LRform">
      <form id="LRformbody" onSubmit={handleSubmit}>
        <h1 id="formType">{formTypes[0]}</h1>

        {error && <div className="errorMessage">{error}</div>}
        {success && <div className="successMessage">{success}</div>}

        <div className="inputGroup">
          <label htmlFor="username">Enter Your Username</label>
          <input 
            id="username" 
            type="text" 
            name='username'
            value={formData.username}
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
          <button id="enterForm" type="submit" disabled={animateTruck}>
            <BsTruckFlatbed id="emptyTruckIcon" className={animateTruck ? 'animate' : ''} />
            GO
            <PiTruckFill id="fullTruckIcon" />
          </button>
        </div>
      </form>
    </div>
  );
}
