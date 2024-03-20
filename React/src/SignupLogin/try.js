import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadVideo = async () => {
    if (selectedFile) {
      try {
        // Create a FormData object
        const formData = new FormData();

        // Append the selected file to the FormData with a field name ('videoFile' in this example)
        formData.append('image', selectedFile);

        // Make an Axios request to the server endpoint
        const response = await axios.post('http://localhost:8080/teacher/course/content/video/35', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Video upload successful', response.data);
      } catch (error) {
        console.error('Error uploading video', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={uploadVideo}>Upload Video</button>
    </div>
  );
};

export default VideoUpload;
