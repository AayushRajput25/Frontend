// Home.js

import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home">
      <div className="section">
        <div className="content">
          <h2>Left Section</h2>
          <p>
            This is the description for the left section. You can add more
            content here.
          </p>
        </div>
        <div className="image">
          <img src="/path/to/homephoto.jpg" alt="homephoto" />
        </div>
      </div>

      <div className="section">
        <div className="image">
          <img src="/path/to/homephoto.jpg" alt="homephoto" />
        </div>
        <div className="content">
          <h2>Right Section</h2>
          <p>
            This is the description for the right section. You can add more
            content here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
