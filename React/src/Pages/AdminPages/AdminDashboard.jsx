// AdminDashboard.jsx

import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Background from '../../components/Background';
import './TeacherDashboard.css';
import Navbar from '../../components/Navbar';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState(null);
  const [fetchedTeacherData, setFetchedTeacherData] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const email = sessionStorage['email'];
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/home/${email}`)
      .then((response) => {
        const teacherId = response.data.id;
        sessionStorage.setItem('teacher_id', teacherId);
        setFetchedTeacherData({ ...response.data, id: teacherId });
      })
      .catch((error) => {
        console.error('Error fetching teacher data:', error);
      });
  }, [email]);

  useEffect(() => {
    if (fetchedTeacherData && fetchedTeacherData.id) {
      const fetchTeacherData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/teacher/${fetchedTeacherData.id}`);
          setTeacherData(response.data);
        } catch (error) {
          console.error('Error fetching teacher data:', error);
        }
      };

      fetchTeacherData();
    }
  }, [fetchedTeacherData]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadImage = async () => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('imageFile', selectedFile);

      const teacherId = fetchedTeacherData ? fetchedTeacherData.id : null;

      await axios.post(`http://localhost:8080/teacher/images/${teacherId}`, formData, {
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
      await axios.delete(`http://localhost:8080/teacher/${teacherData.id}`);
      console.log("Account Deleted Successfully!");
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('teacher_id')
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <Background imageUrl={'https://wallpapercave.com/wp/wp8063327.jpg'}>
      <Navbar />
      <div className={`container ${showDeletePrompt ? 'blurred' : ''}`}>
        {teacherData && (
          <div className="dashboard-container">
            <div className="profile-info">
              <div className="profile-container">
                <div className="profile-photo">
                  <img
                    src={`http://localhost:8080/teacher/images/${teacherData.id}`}
                    alt="Profile"
                    className="img-fluid border rounded"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
                <div className="profile-details">
                  <h2 className="profile-name">{teacherData.name}</h2>
                  <p className="profile-info-text">{teacherData.age} years old</p>
                  <p className="profile-info-text">{teacherData.gender}</p>
                  <p className="profile-info-text">{teacherData.phoneNo}</p>
                  <p className="profile-info-text">{teacherData.address}</p>

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
              <Link to="/edit_teacher" className="action-div primary-bg">
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
    </Background>
  );
};

export default TeacherDashboard;
