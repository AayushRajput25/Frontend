import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Navbar = () => {
  const email = sessionStorage["email"];
  const Authorizationn = sessionStorage["Authorization"];
  const [refValue, setRefValue] = useState("");

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:8080/home/${email}`, {
        headers: {
          "Authorization": Authorizationn
        }
      }).then((Response) => {
        setRefValue(Response.data);
      });
    }
  }, [email, Authorizationn]);

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
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
        <div className="container">
          <Link className="navbar-brand" to="/home" style={{ color: 'black' }}>E-Learning</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/home" style={{ color: 'black' }}>Home</Link> 
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about" style={{ color: 'black' }}>About</Link> 
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/contact" style={{ color: 'black' }}>Contact</Link> 
              </li> */}
              {!email && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ color: 'black' }}>Login</Link> 
                </li>
              )}
              {email && (
                <>
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'black' }}>
                      Logout
                    </button>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home" style={{ color: 'black' }}>
                      | Welcome {refValue.name} |
                    </Link> 
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
