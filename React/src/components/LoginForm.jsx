
// LoginForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Background from './Background';
import Toast from './Toast';

function LoginForm() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showToast, setShowToast] = useState(false); // State to control toast visibility
  const storedEmail = sessionStorage.getItem('email');
  const jwt = sessionStorage.getItem('jwt');
  const [email, setEmail] = useState(storedEmail || '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    if (storedEmail || jwt) {
      console.log("Already Logged In");
      // Redirect the user to the home page if they are already logged in
      navigate('/student_dashboard');
    }
  }, [navigate, storedEmail]); // Depend on navigate and storedEmail

  const handleShowToast = (message, type) => {
    <Toast message={message} type={type} />;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:8080/users/signin', userData);

      if (response.data.message === "Successful Authentication!!") {
        const jwt = response.data.jwt;
        sessionStorage.setItem('jwt', 'Bearer: ' + jwt);
        sessionStorage.setItem('email', email);
        setLoggedIn(true);
        console.log("Logged In Successfully");
        handleShowToast("Logged In Successfully", "success");
        navigate('/student_dashboard');
      } else {
        // Handle authentication error
        console.error('Authentication failed');
        console.log("Bad Credentials");
        // Show error toast
        handleShowToast("Authentication failed", 'error');
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error during authentication:', error);
      console.log("Error during authentication");
      // Show error toast
      handleShowToast("Error during authentication", 'error');
    }
  };

  return (
    <Background imageUrl={sessionStorage.getItem('bgimg')}>
      <div className="container mt-4" style={{ maxWidth: '400px' }}>
        <div className="card p-3 shadow">
          <h2 className="mb-3">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='abc@test.com'
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='password'
              />
            </div>
            <button type="submit" className="btn btn-primary mb-3">Submit</button>
          </form>
          <p className="mb-0">Not a member? <a href='/student_signup'>Sign Up</a></p>
        </div>
        {showToast && <Toast message={showToast.message} type={showToast.type} />}
      </div>
    </Background>
  );
}

export default LoginForm;
