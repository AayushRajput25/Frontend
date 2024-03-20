import { useEffect, useState } from "react";
import axios from "axios";
import { FormGroup, Label, Container, Table } from 'reactstrap';
import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Row,
  Col,
  Button
} from 'reactstrap';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ATeacherCourses = () => {
  const teacherid = sessionStorage["teacherid"];
  const [content, setContent] = React.useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseContent, setCourseContent] = useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:8080/admin/course/${teacherid}`)
      .then((response) => {
        console.log(response.data);
        setContent(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  }, [teacherid]);


  const handleSelectChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("Selected Course:", selectedCourse);
    axios.get(`http://localhost:8080/admin/course_content/${selectedCourse}`)
    .then((response) => {
      setCourseContent(response.data)
    })
    .catch((error) => {
      // Handle error
    });
  };

  const deleteContent = (impid) => { 
//console.log(impid)
const serverUrl = `http://localhost:8080/admin/course/content/${impid}`;
    axios.delete(serverUrl).then(() => {
      setCourseContent(prevCourses => prevCourses.filter(courseContent => courseContent.id !== impid));
    }).catch((error) => {
      console.log(error);
    });
  }

  const navigate = useNavigate() 

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const OnLogOut = () => {
    sessionStorage.removeItem('Authenticate')
    navigate('/')
  }

  return (
    <div>
    
 <Navbar color="dark" dark expand="md" className='container-fluid'>
        <NavbarBrand href="/">E-Learning</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          
            <NavItem>
            <Link className="nav-link" to="/" onClick={OnLogOut}>Logout</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              {/* <DropdownToggle nav caret>
                Options
              </DropdownToggle> */}
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText></NavbarText>
        </Collapse>
      </Navbar>
    <Container>
      <FormGroup>
        <Label for="courseSelect">Select the Course:</Label>
        <select id="courseSelect" className="form-control" onChange={handleSelectChange}>
          <option value="" disabled selected>Select a course</option>
          {content.map((course) => (
            <option key={course.id} value={course.id}>
              {course.courseName}
            </option>
          ))}
        </select>
      </FormGroup>
  {/* <Button color="success" onClick={() => findContents(item.id)}>Find content</Button> */}
  <Button color="success" onClick={handleButtonClick}>
        Find content
      </Button>
    </Container>
    <br/>
    <br/>
  
    {courseContent.length > 0 && (
        <Table hover bordered striped responsive> 
          <thead>
            <tr>
              <th style={{width:'4%'}}>ID</th>
              <th style={{width:'15%'}}>Title</th>
              <th>Description</th>
              <th style={{width:'4%'}}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {courseContent.map((content) => (
              <tr key={content.id}>
                <td>{content.id}</td>
                <td>{content.title}</td>
                <td>{content.description}</td>
                <Button color="danger" size="sm" className="ml-4" onClick={() => deleteContent(content.id)} style={{alignContent: "center"}}>Delete</Button>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

    </div>
  );
}

export default ATeacherCourses;
