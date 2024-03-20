import React, { useEffect } from "react";
import { useState } from "react";
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
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import MenuSign from "./Menu";
import HeaderSign from "./HeaderSign";
import axios from "axios";

const MainPage = () => 
{

const email = sessionStorage["email"]

useEffect(() => {
axios.get("http://localhost:8080/home/" + email).then((Response) => console.log(Response.data))
}, [email])

return (
    <div className="text-center">
      <h1>You are a student you work is in Progress</h1>
      <h2>After Ayush makes the enrollement Table</h2>
    </div>);
}

export default MainPage;