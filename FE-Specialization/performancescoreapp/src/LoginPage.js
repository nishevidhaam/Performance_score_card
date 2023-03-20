import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(username=="" || password==""){
      alert("Enter the valid data")
      return("Enter the valid data")
    }
    const performanceScorecard = {
      username:username,
      password:password
    
    };
    
    try {
      // Submit the performance scorecard data to the backend API
      const response = await fetch ('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performanceScorecard),
      });
 
      // Handle the response from the backend API
      const data = await response.json();
      console.log(data);
      if(data.hasOwnProperty('error')){
        alert("Username or password incorrect")
        return
      }
      alert("login successful")
      navigate("/PerformanceScorecard")
    } catch (error) {

      // console.error(error);
    }


  }

 
  const navigate = useNavigate()

 
  

  return (
    <div className="login-page">
      <h1 className="login-title">Welcome back!</h1>
      <div className="login-form">
        <label className="login-label">
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} className="login-input" required />
        </label>
        <label className="login-label">
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} className="login-input" required />
        </label>
        <label className="login-label">
          User Role:
          <select value={userRole} onChange={handleUserRoleChange} className="login-input" required>
            <option value="">Select a role</option>
            <option value="manager">Manager</option>
            <option value="director">Director</option>
            <option value="seniorDirector">Senior Director</option>
            <option value="ceo">CEO</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        
        <button className ="button" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
