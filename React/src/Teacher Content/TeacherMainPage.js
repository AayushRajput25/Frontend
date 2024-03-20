import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import MyContext from "../Student/MyContext";
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
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { Sidebar } from "react-pro-sidebar";
import Sidebarr from "./Sidebar";
import Content from "./Content";
import Addcourse from "../Addcourse";
import Allcourse from "../Allcourses";
import { useContext } from "react";
import FetchStudents from "./MyStudents";
import TecherDashboard from "./TecherDashboard"
const Teacher = () => {
const [refValue, setRefValue] = useState("");
const [conditionn, setCondition] = useState("-1");
const email = sessionStorage["email"] //save email in session
const Authorizationn = sessionStorage["Authorization"]
console.log(Authorizationn)
useEffect(() => {
axios.get("http://localhost:8080/home/"+ email, {
  headers: {
    "Authorization": Authorizationn
  }
}).then((Response) => {setRefValue(Response.data)})
}, [email, Authorizationn])


const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate() 

  const OnLogOut = () => {
    sessionStorage.removeItem('Authenticate')
    navigate('/')
  }

  const ChangePage = (pageno) => {
    setCondition(pageno)
  }

  function YourComponent() {
     if (conditionn === "-1") {
     return <TecherDashboard/>
     }
    else if (conditionn === "0") {
     return <Addcourse/>
    } else if (conditionn === "1"){
      return <Allcourse/>
    }
    else if (conditionn === "2")
      {
return <FetchStudents/>
      }
    }
  
    console.log(refValue)

return(
    <div>
 
 <Navbar color="dark" dark expand="md" className='container-fluid'>
        <NavbarBrand href="/">E-Learning</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
            <Link className="nav-link" onClick={()=>ChangePage("0")}>Add Course</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link" onClick={()=>ChangePage("1")}>My Courses</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link" onClick={()=>ChangePage("2")}>My Students</Link>
            </NavItem>
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
          <NavbarText>|{ ' '} Welcome {' '} {refValue.name} { ' '}|</NavbarText>
        </Collapse>
      </Navbar>
      <Header/>
      <Row>
      <Col md={2}>

      </Col>
      <Col md={10}>
        {YourComponent()}
      </Col>
      </Row>
</div>
)}
export default Teacher