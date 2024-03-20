
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import Background from "../components/Background";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../components/Footer";

const imageUrl = 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjEwNjQtMzYta3ZjNHNieHcuanBn.jpg';
sessionStorage.setItem('bgimg', imageUrl);

const Home = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/home/courses')
      .then(response => setCourseData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEnroll = async (courseId) => {
    const studentId = sessionStorage.getItem('student_id');
    if (studentId != null || sessionStorage.getItem('jwt') != null) {
      try {
        await axios.post(`http://localhost:8080/student/enroll/${studentId}/${courseId}`);
        // Add logic for successful enrollment, e.g., show a message to the user
        console.log(`Enrolled in course ${courseId}`);
        toast.success("Successfully Enrolled!");
      } catch (error) {
        console.error('Error enrolling in the course:', error);
        // Handle the error, e.g., show an error message to the user
      }
    }
  };

  return (
    <Background imageUrl={'https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg'}>
      <Navbar />
      <div className="container">
        <div className="row">
          {courseData.map((course, index) => (
            <div key={index} className="col-md-3 mb-3">
              <CourseCard
                title={course.courseName}
                description={course.description}
                kaam={"Enroll"}
                courseId={course.id} // Use the correct property name for courseId
                onEnroll={() => handleEnroll(course.id)} // Update here as well
              />
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
   
    </Background>
  );
};

export default Home;