     

import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { Alert } from 'reactstrap';
export default function App() {
    const bottomComponentStyle = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        textAlign: 'center',
        boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for separation
      };
    
  return (
    <div style={bottomComponentStyle}>
    <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(100, 100, 100, 100)' }}>
  <h5 style={{color:"white"}}>E-Learning Testing CopyRight 2024</h5>
          </div>
    </MDBFooter>
    </div>  
  );
}