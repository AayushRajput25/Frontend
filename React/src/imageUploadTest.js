import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadImage = () => {
    if (selectedFile) {
      // Create a FormData object
      const formData = new FormData();

      // Append the selected file to the FormData with a field name ('image' in this example)
      formData.append('imageFile', selectedFile);


      // Make an Axios request to the server endpoint
      axios.post('http://localhost:8080/student/images/10', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log('Image upload successful', response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
