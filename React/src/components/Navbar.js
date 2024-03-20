import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const handleLogout = () => {
    // Use a confirm dialog to ask the user if they are sure to logout
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    
    // If the user confirms, perform the logout actions
    if (confirmLogout) {
      // Your logout logic here
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('id');
      
      // Redirect to the login page
      window.location.href = '/login'; // Use this to force a full page reload
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">E-Learning</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav justify-content-end"> {/* Use justify-content-end class here */}
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link> 
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

