import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card, CardBody, CardSubtitle, CardText, Button, Container, Row, Col
} from 'reactstrap';
import { useNavigate } from 'react-router-dom'
import Background from "./components/Background";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Allcourse = () => {
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
          const response = await axios.get(`http://localhost:8080/teacher/course/${refValue.id}`);
          setCourses(response.data);
        }
      } catch (error) {
        notify();
      }
    };

    fetchData();
  }, [refValue]);

  const deleteCourse = (id) => {
    const serverUrl = `http://localhost:8080/teacher/course/${id}`;
    axios.delete(serverUrl).then(() => {
      // Filter out the deleted course from the state
      setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
    }).catch((error) => {
      console.log(error);
    });
  }

  const Addcontent = (Courseid) => {
    sessionStorage['Course'] = Courseid
    navigate('/contents')
  }

  return (
    <div>
      <Navbar />
      <Background imageUrl={'https://wallpapercave.com/wp/wp8063327.jpg'}>
        <h1 className="text-center mt-4">All Courses</h1>
        <p className="text-center">List of Courses are as follows</p>

        <Container>
          {Courses.length > 0 ? Courses.map((item) => (
            <Row key={item.id} className="mb-2">
              <Col md={8} className="mx-auto">
                <Card className="text-center">
                  <CardBody>
                    <CardSubtitle className="font-weight-bold"><h4>{item.courseName}</h4></CardSubtitle>
                    <CardText>{item.description}</CardText>
                    <div className="d-flex justify-content-center mt-3">
                      <Button color="success" className="mr-4" onClick={() => Addcontent(item.id)}>Add content</Button>
                      <Button color="danger" onClick={() => deleteCourse(item.id)} className="ml-4">Delete</Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )) : <Row className="text-center"><Col><p>No courses</p></Col></Row>}
        </Container>
        
         <div className="text-center mt-3">
          <Button color="primary" onClick={() => navigate('/teacher_dashboard')}>
            Go to Teacher Dashboard
          </Button>
        </div>
<br/>
       
      </Background>
    </div>
  );
}
export default Allcourse;
