import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
import AllStudents from "./AllStudents"
import AllTeacher from "./AllTeachers"
import AnalyticsPage from "./AnalyticsPage";
import Footer from "../components/Footer";

const AdminPanel = () => {
    const email = sessionStorage["email"]
    const Authorizationn = sessionStorage["Authorization"];
    const [refValue, setRefValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [conditionn, setCondition] = useState("-1");
    useEffect(() => {
        axios.get("http://localhost:8080/home/"+ email).then((Response) => {setRefValue(Response.data)})
        }, [email])


  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate() 

  const OnLogOut = () => {
    sessionStorage.removeItem('Authenticate')
    navigate('/')
  }

  function YourComponent() {
    if (conditionn === "0") {
     return <AllStudents/>
    } else if (conditionn === "1"){
      return <AllTeacher/>
    }
    else if (conditionn === "2")
      {
//return <FetchStudents/>
      }
    else if (conditionn=== "-1"){
      return <AnalyticsPage/>
    }
    }

    const ChangePage = (pageno) => {
        setCondition(pageno)
      }


  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:8080/home/${email}`, {
        headers: {
          "Authorization": Authorizationn
        }
      }).then((Response) => {
        setRefValue(Response.data);
      });
    }
  }, [email, Authorizationn]);

  const handleLogout = () => {
    // Use a confirm dialog to ask the user if they are sure to logout
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    // If the user confirms, perform the logout actions
    if (confirmLogout) {
      // logout logic here
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('id');
      
      // Redirect to the login page
      window.location.href = '/login'; // Use this to force a full page reload
    }
  };
        
    return (
    <div>
{/* <Navbar color="dark" dark expand="md" className='container-fluid'>
        <NavbarBrand to="http://localhost:3000/Adminpanel">E-Learning</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
            <Link className="nav-link" onClick={()=>ChangePage("0")}>View All Students</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link" onClick={()=>ChangePage("1")}>View All Teachers</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link" to="/" onClick={OnLogOut}>Logout</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              {/* <DropdownToggle nav caret>
                Options
              </DropdownToggle> 
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
          <NavbarText>ADMIN PANEL</NavbarText>
        </Collapse>
      </Navbar> */}

       <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
        <div className="container">
          <Link className="navbar-brand"  style={{ color: 'black' }}>E-Learning</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" onClick={()=>ChangePage("0")} style={{ color: 'black' }}>View All Students</Link> 
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={()=>ChangePage("1")} style={{ color: 'black' }}>View All Teachers</Link> 
              </li>
        
              {!email && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ color: 'black' }}>Login</Link> 
                </li>
              )}
              {email && (
                <>
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'black' }}>
                      Logout
                    </button>
                  </li>
                 
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

    
        {YourComponent()}
    
    </div>) ;
}
export default AdminPanel