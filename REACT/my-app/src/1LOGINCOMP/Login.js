import React,{useState, createContext} from 'react';
import './Login.css';
import LoginTypePage from './LoginTypePage';

//creating context to use some values like userType
export const LoginContext = createContext();

export default function Login() {
    //userType for storing user selected login or register
    const [userType,setUserType]=useState(0);
    

    const handleLogin=()=>{ 
        setUserType((prevType)=>"login");
        console.log(userType)

    }
    const handleRegister=()=>{
        setUserType((prevType)=>"register")
        console.log(userType)
    }
    
  return (
    <LoginContext.Provider value={userType}>
     
      
   
     { userType?(<LoginTypePage />) 
     
     : 
     (
        <div id="loginComponent">
        <h1 id="appName">TRAH</h1>
     <h2 id="welcome"> Welcome to TRAH !</h2>
     <h2 id="quote">"Upgrade Transportation To The Next Level with Us"</h2>
     <div id="loginOptionBox">
        <div>
            <button id="login" onClick={handleLogin}>LOGIN</button>
        </div>
        <div>
            <button id="register" onClick={handleRegister}>REGISTER</button>
        </div>

     </div>

  
     </div>
     )
        
     }
      
      
    
    </ LoginContext.Provider >
  )
}
