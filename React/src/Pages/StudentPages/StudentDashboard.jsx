
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Background from '../../components/Background';
import './StudentDashboard.css';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../../components/Footer';

const StudentDashboard = () => {
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
          toast.success("Photo Updated!");
          console.log("Photo post ho gaya.");
          console.log(response.data);
          navigate('/student_dashboard');
        } else {
          toast.error("Something Went Wrong!");
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

  return (
    <>
    <Background imageUrl={`https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg`}>
      <Navbar />
      <div className={`container ${showDeletePrompt ? 'blurred' : ''}`}>
        {studentData && (
          <div className="dashboard-container">
            <div className="profile-info1">
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
                  <h2 className="profile-name">{studentData.name}</h2>
                  <p className='profile-info-text'>{studentData.age} years old</p>
                  <p className='profile-info-text'>{studentData.gender}</p>
                  <p className='profile-info-text'>{studentData.phoneNo}</p>
                  <p className='profile-info-text'>{studentData.address}</p>

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
              <Link to="/edit_student" className="action-div primary-bg">
                Edit Profile
              </Link>
              <Link to="/home" className="action-div primary-bg">
                Get All Courses
              </Link>
              <Link to="/my_courses" className="action-div primary-bg">
                My Courses
              </Link>
              <button className="action-div primary-bg" onClick={() => setShowDeletePrompt(true)}>
                Delete Account
              </button>
            </div>
          </div>
        )}

        {showDeletePrompt && (
          <div className="delete-prompt">
            <p className="delete-prompt-text">Are you sure you want to delete your account?</p>
            <button className="btn btn-secondary" onClick={() => setShowDeletePrompt(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>Confirm</button>
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}

    </Background>
    </>
  );
};

export default StudentDashboard;

