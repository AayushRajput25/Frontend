import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState, useContext, createContext } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import SignIn from '../SignupLogin/SignIn'
import SignUp from '../SignupLogin/StudentSignUp'
import MainPage from '../SignupLogin/MainPage'
import TeacherSignUp from '../SignupLogin/TeacherSignUp'
import StudentSignUp from '../SignupLogin/StudentSignUp'
import Content from '../Teacher Content/Content'
import App from "../App"

import Addcourse from '../Addcourse'
import Allcourse from '../Allcourses'
import Student from '../Students'
import TeacherMainPage from "../Teacher Content/TeacherMainPage"
import Addcontent from '../Teacher Content/AddContent'
import FetchStudents from '../Teacher Content/MyStudents'
import StudentDashboard from '../Pages/StudentPages/StudentDashboard'
import StudentCourses from '../Pages/StudentPages/StudentCourses'
import EditStudent from '../Pages/StudentPages/EditStudent'
import Home from '../Pages/Home'
import ContactPage from '../Pages/ContactPagr'
import About from '../Pages/About'
import StudentContent from '../Pages/StudentPages/StudentContent'
import ATeacherCourses from '../Admin/ATeacherCourses'
import AdminPanel from '../Admin/AdminPanel'
import AdminPanelash from '../Admin/AdminPanelash'
import AnalyticsPage from '../Admin/AnalyticsPage'

function SaiBaba() {
 

  return (
    <div className='container-fluid'>
      <Routes>
        <Route path='/' Component={SignIn} />
        <Route path='/Home' Component={Home} />
        <Route path='/Mystudents' Component={FetchStudents} />
        <Route path="/MainPage" Component={MainPage} exact />
        <Route path="/App" Component={App} exact />
        <Route path="/Content" Component={Content} exact />
        <Route path="/SignIn" Component={SignIn} exact />
        <Route path="/TeacherSignup" Component={TeacherSignUp} exact />
        <Route path="/StudentSignup" Component={StudentSignUp} exact />
        <Route path = "Today" Component={App} />
        <Route path="/viewcourse" Component={Allcourse} exact />
       <Route path="/students" Component={Student} exact />
       <Route path="/TeacherMainPage" Component={TeacherMainPage} exact />
       <Route path="/contents" Component={Content} exact />
       <Route path="/AddContent" Component={Addcontent} exact />
       <Route path="/StudentMainPage" Component={StudentDashboard} exact />
       <Route path="/Student_dashboard" Component={StudentDashboard} exact />
       <Route path="/my_courses" Component={StudentCourses} exact />
       <Route path="/home" Component={Home} exact />
       <Route path="/edit_student" Component={EditStudent} exact />
       <Route path="/contact" Component={ContactPage} exact />
       <Route path="/about" Component={About} exact />
       <Route path="/login" Component={SignIn} exact />
       <Route path="/Studentcontents" Component={StudentContent} exact />
       <Route path="/AdminTeacherCourses" Component={ATeacherCourses} />
       <Route path="/Adminpanel" Component={AdminPanel} />
       <Route path="/Adminka" Component={AdminPanelash} />
       <Route path="/analytics" Component={AnalyticsPage} />

      </Routes>
      <ToastContainer />
    </div>
   
  )
}

export default SaiBaba
