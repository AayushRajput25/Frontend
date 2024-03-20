import React from 'react';
import './css/CourseCard.css'; // Import the external CSS file
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'bootstrap';
import { useState } from 'react';
import StudentContent from '../Pages/StudentPages/StudentContent';


const ContentCard = ({ title, description, enrollmentId, kaam, }) => {
    
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    
    const handleDelete = async () => {
        try{
            const response = await axios.delete(`http://localhost:8080/student/enroll/${enrollmentId}`);
            if (response.status === 200){
                toast.success("Successfully Unenrolled!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                })
                console.log("Delete ho gaya");    
            }
        }
        catch(e){
            console.log("Some error: " + e);
        }
    }
// curl -X 'GET' \
  // 'http://localhost:8080/teacher/course_content/1'  1 = course_id
  const handleViewContent = async () => {
    const studentId = sessionStorage.getItem('student_id');

    
  };


  return (
    <>
    <div className="card m-3 custom-card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-success" onClick={handleViewContent}>
            {kaam}
          </button>
          <button className="btn btn-primary" onClick={handleDelete}>Unenroll</button>
    
        </div>
      </div>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"/>
    </>
  );
};

export default ContentCard;
