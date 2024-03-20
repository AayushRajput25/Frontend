import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


function SApp() {
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

    <br/>
    <br/>
<br/>

     <Container>
     <Row>
      <Col md={4}>

      </Col>

      <Col md={8}>
    
      </Col>
     </Row>

     </Container>

</div>
  );
}

export default SApp;
