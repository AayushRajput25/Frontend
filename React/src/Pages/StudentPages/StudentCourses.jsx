// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/Navbar";
// import ContentCard from "../../components/ContentCard";
// import Background from "../../components/Background";
// import axios from "axios";
// import Footer from "../../components/Footer";

// const imageUrl = sessionStorage.getItem('imgUrl');

// const StudentCourses = () => {
//   const [courseData, setCourseData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const studentId = sessionStorage.getItem('student_id');
//     axios.get(`http://localhost:8080/student/enroll/${studentId}`)
//       .then(response => {
//         setCourseData(response.data);
//         console.log(courseData);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//       });
//   }, []);

//   return (
//     <Background imageUrl={'https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg'}>
//       <Navbar />
//       <div className="container">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="row"> 
//             {courseData.length > 0 ? (
//               courseData.map((course, index) => (
//                 <div key={course.eid} className="col-md-3 mb-3">
//                   <ContentCard
//                     title={course.cname}
//                     description={course.des}
//                     enrollmentId={course.eid}
//                     kaam={"View Contents"}
//                   />
//                 </div>
//               ))
//             ) : (
//               <div className="text-center mt-5 p-4 rounded bg-light border shadow-sm">
//                 <p className="mb-3" >You are not enrolled in any courses</p>
//                 <button className="btn btn-success">Explore Courses</button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </Background>
//   );
// }

// export default StudentCourses;


// // //  My work
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card, CardBody, CardSubtitle, CardText, Button, Container
} from 'reactstrap';
import { useNavigate } from 'react-router-dom'
import Background from "../../components/Background";

const StudentCourses = () => {
  const navigate = useNavigate()  
  const notify = () => toast.error('Fetching Unsuccessful', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const email = sessionStorage["email"];
  const [Courses, setCourses] = useState([]);
  const [refValue, setRefValue] = useState("");
 

  useEffect(() => {
    axios.get("http://localhost:8080/home/" + email).then((Response) => {setRefValue(Response.data)});
  }, [email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if refValue is truthy before making the request
        if (refValue) {
          const response = await axios.get(`http://localhost:8080/student/enroll/${refValue.id}`);
          setCourses(response.data);
        }
      } catch (error) {
        notify();
      }
    };

    fetchData();
  }, [refValue]);

  useEffect(() => {
    console.log(Courses)
  }, [Courses])

  const ViewContent = (Courseid) => {
    console.log(Courseid)
     sessionStorage['Course'] = Courseid
     navigate('/Studentcontents')
  }
  
  return (

    <div>
      <Background imageUrl={'https://wallpapercave.com/wp/wp8063327.jpg'}>

      <h1 className="text-center">All Courses</h1>
      <p>List of Courses are as follows</p>

      {Courses.length > 0 ? Courses.map((item) => (
        <div key={item.eid}>
          <Card className="text-center ml-3">
            <CardBody>
              <CardSubtitle className="font-weight-bold">{item.cname}</CardSubtitle>
              <CardText>{item.des}</CardText>
              <Container className="text-center">
                <Button color="warning" onClick={() => ViewContent(item.id)}>View Content</Button>
                <Button color="danger ml-3" >Unenroll</Button>
              </Container>
            </CardBody>
          </Card>
        </div>
      )) : "No courses"}
      </ Background>
    </div>
   
  );
}

export default StudentCourses;

