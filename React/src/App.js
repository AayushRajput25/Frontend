import './App.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import Course from './Course';
import Allcourse from './Allcourses';
import Addcourse from './Addcourse';
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
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';
import Menus from './Menu';
import Header from './Header';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Student from './Students';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
      <div>
     
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">E-Learning</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            <NavItem>
              <NavLink href="/components/">My Courses</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
      
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
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
          
        </Collapse>
      </Navbar>
     <ToastContainer/>
     <br/>
     <br/>
    <Header/>
    <br/>
    <br/>
<br/>

     <Container>
     <Row>
      <Col md={4}>
        <Menus/>
      </Col>

      <Col md={8}>
     <Allcourse/>
      </Col>
     </Row>

     </Container>
     
</div>
  );
}

export default App;
