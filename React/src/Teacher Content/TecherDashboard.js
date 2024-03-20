import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Background from '../components/Background';
import '../Pages/StudentPages/StudentDashboard.css';
const TeacherDashboard = () => {
    const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [fetchedStudentData, setFetchedStudentData] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const email = sessionStorage['email'];
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/home/${email}`)
      .then((response) => {
        const studentId = response.data.id;
        sessionStorage.setItem('student_id', studentId);
        setFetchedStudentData({ ...response.data, id: studentId });
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, [email]);

  useEffect(() => {
    if (fetchedStudentData && fetchedStudentData.id) {
      const fetchStudentData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/student/${fetchedStudentData.id}`);
          setStudentData(response.data);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };

      fetchStudentData();
    }
  }, [fetchedStudentData]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadImage = async () => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('imageFile', selectedFile);

      const studentId = fetchedStudentData ? fetchedStudentData.id : null;

      await axios.post(`http://localhost:8080/student/images/${studentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        if (response.status === 201) {
          console.log("Photo post ho gaya.");
          console.log(response.data);
        } else {
          console.log("Nhi chala ");
        }
      });
    } catch (e) {
      console.log("Error aaya: " + e);
    } finally {
      setIsUploading(false);
      setSelectedFile(null); // Reset selectedFile after uploading
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:8080/student/${studentData.id}`);
      console.log("Account Deleted Successfully!");
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('jwt');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
return (<div>
     <Background imageUrl={sessionStorage.getItem('bgimg')}>
      <div className={`container ${showDeletePrompt ? 'blurred' : ''}`}>
        {studentData && (
          <div className="dashboard-container">
            <div className="profile-info">
              <div className="profile-container">
                <div className="profile-photo">
                  <img
                    src={`http://localhost:8080/student/images/${studentData.id}`}
                    alt="Profile"
                    className="img-fluid border rounded"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
                <div className="profile-details">
                  <h2>{studentData.name}</h2>
                  <p>{studentData.age} years old</p>
                  <p>{studentData.gender}</p>
                  <p>{studentData.phoneNo}</p>
                  <p>{studentData.address}</p>

                  {!isUploading && (
                  <div className="button-container">
                    <input type="file" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} ref={fileInputRef} />
                    <button className="btn btn-primary mb-2" onClick={() => fileInputRef.current.click()}>Change Photo</button>
                  </div>
                  )}

                  {selectedFile && (
                    <div className="button-container">
                      <button className="btn btn-success me-2" onClick={handleUploadImage}>Upload Photo</button>
                      <button className="btn btn-secondary" onClick={() => setSelectedFile(null)}>Cancel</button>
                    </div>
                  )}
                  </div>
              </div>
            </div>

            <div className="action-buttons">
              <Link to="/edit_student" className="action-div white-bg">
                Edit Profile
              </Link>
              <Link to="/home" className="action-div white-bg">
                View My Courses
              </Link>
              <Link to="/my_courses" className="action-div white-bg">
                View Students
              </Link>
              <button className="action-div white-bg" onClick={() => setShowDeletePrompt(true)}>
                Delete Account
              </button>
            </div>
          </div>
        )}

        {showDeletePrompt && (
          <div className="delete-prompt">
            <p>Are you sure you want to delete your account?</p>
            <button className="btn btn-secondary" onClick={() => setShowDeletePrompt(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>Confirm</button>
          </div>
        )}
      </div>
    </Background>
</div>)

}
export default TeacherDashboard;