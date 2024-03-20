import React from "react";
import Header from "./Header"
import Sidebarr from "./Sidebar";
import { Row } from "react-bootstrap";
import { Col } from "reactstrap";
import Example from "./Navbar";
import ReactPlayer from "react-player";
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom'
// import './Content.css';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../Student/MyContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Content = () => {

  const [Courses, setCourses] = useState([]);
  const [refValue, setRefValue] = useState(""); //email
  const [courseName, setcoursename] = useState(""); 

  const email = sessionStorage["email"]
  useEffect(() => {
    axios.get("http://localhost:8080/home/" + email).then((Response) => {setRefValue(Response.data)})
    }, [email])

    const courseid = sessionStorage["Course"]
    useEffect(() => {
      axios.get("http://localhost:8080/teacher/Course/name/" + courseid).then((Response) => {setcoursename(Response.data.message)})
      }, [courseName])
 
   
  const navigate = useNavigate() 
  const OnLogOut = () => {
    sessionStorage.removeItem('Authenticate')
    navigate('/AddContent')
}

const imp = sessionStorage["Course"]
useEffect(() => {
  axios.get(`http://localhost:8080/teacher/course_content/${imp}`).then((Response) => {setCourses(Response.data)});
}, [imp]);

const [luffy, setluffy] = useState({title : " ", description : " ", filePath : " "});

const dosomething = (bottle) => {
setluffy({title : bottle.title, description : bottle.description, filePath : bottle.filePath})
}

const deletesomething = (id) => {
console.log(id)
// /teacher/course/content/{contentId}
const serverUrl = `http://localhost:8080/teacher/course/content/${id}`;
axios.delete(serverUrl).then(() => {
  setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
}).catch((error) => {
  console.log(error);
});
}
console.log(luffy)
return (
  <div style={{ backgroundColor: '#add8e6', padding: '20px' }}>
    {/* Navbar */}
    <Navbar />
    <br />
    <Row>
      {/* Left Column */}
      <Col md={3}>
        {Courses.length > 0 ? (
          Courses.map((item) => (
            <div key={item.id}>
              <Sidebar>
                <Menu>
                  <table>
                    <tr>
                      <td style={{ width: '150px' }}>
                        <Link
                          className="nav-link"
                          onClick={() => dosomething(item)}
                          key={item.id}
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          onClick={() => deletesomething(item.id)}
                          size="sm"
                          className="ml-4"
                        >
                          delete
                        </Button>
                      </td>
                    </tr>
                  </table>
                </Menu>
              </Sidebar>
            </div>
          ))
        ) : (
          <p>No Contents</p>
        )}
        <Sidebar>
          <Menu>
            <Link className="nav-link" to="/Addcontent">
              Add content +
            </Link>
          </Menu>
        </Sidebar>
      </Col>

      {/* Right Column */}
      <Col md={9}>
        {/* Header Component */}
        <Header name={refValue.name} contents={courseName} />
        <br />
        <Row>
          <Col md={5}>
            <h4>{luffy.title}</h4>
            <br />
            <p>
              <h6>{luffy.description}</h6>
            </p>
            <br />
          </Col>
          <Col md={7}>
            <ReactPlayer url={luffy.filePath} controls={true} />
          </Col>
        </Row>
      </Col>
    </Row>
    <br />
    {/* Footer Component */}
    <Footer />
  </div>
);
        }
export default Content;