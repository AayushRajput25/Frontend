import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => { 
    // Make a GET request to the server endpoint that serves the image
    axios.get('http://localhost:8080/student/images/10', {
      responseType: 'blob', // Ensure the response is treated as a Blob
    })
      .then(response => {
        // Create a URL for the Blob and set the imageUrl state to display the image
        const imageUrl = URL.createObjectURL(response.data);
        setImageUrl(imageUrl);
      })
      .catch(error => {
        console.error('Error fetching image', error);
      });
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div>
      {imageUrl && (
        <div>
          <p>Fetched Image:</p>
          <img src={imageUrl} alt="Fetched" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
