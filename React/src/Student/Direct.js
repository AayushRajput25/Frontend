import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState, useContext, createContext } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import SignIn from '../SignupLogin/SignIn.js'
import SignUp from '../SignupLogin/StudentSignUp.js'
import MainPage from '../SignupLogin/MainPage.js'
import TeacherSignUp from '../SignupLogin/TeacherSignUp.js'
import StudentSignUp from '../SignupLogin/StudentSignUp.js'
import Content from '../Teacher Content/Content.js'
import App from "../App.js"
import Addcourse from '../Addcourse.js'
import Allcourse from '../Allcourses.js'
import Allcourses from '../Allcourses.js'
import Student from '../Students.js'
import TeacherMainPage from "../Teacher Content/TeacherMainPage.js"
import Addcontent from '../Teacher Content/AddContent.js'
import FetchStudents from '../Teacher Content/MyStudents.js'
import StudentDashboard from '../Pages/StudentPages/StudentDashboard.jsx'
import StudentCourses from '../Pages/StudentPages/StudentCourses.jsx'
import EditStudent from '../Pages/StudentPages/EditStudent.jsx'
import Home from '../Pages/Home.jsx'
import ContactPage from '../Pages/ContactPagr.jsx'
import About from '../Pages/About.jsx'
import StudentContent from '../Pages/StudentPages/StudentContent.js'
import ATeacherCourses from '../Admin/ATeacherCourses.js'
import AdminPanel from '../Admin/AdminPanel.js'
import AdminPanelash from '../Admin/AdminPanelash.js'
import AnalyticsPage from '../Admin/AnalyticsPage.js'
import TeacherDashboard from '../Pages/TeacherPages/TeacherDashboard.jsx'
import HomePage from '../Pages/HomePage.jsx'
import EditTeacher from '../Pages/TeacherPages/EditTeacher.jsx'
import TermsOfService from '../components/TermsOfService.jsx'
import PrivacyPolicy from '../components/PrivacyPolicy.js'
import PolarAreaChart from '../Teacher Content/Teacherstats.js'
function Direct() {
  return (
    <div className='container-fluid'>
      <Routes>
        <Route path='/' Component={SignIn} />
        <Route path='/Home' Component={Home} />
        <Route path='/homepage' Component={HomePage} />
        <Route path='/mystudents' Component={FetchStudents} />
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
       <Route path="/edit_teacher" Component={EditTeacher} exact />
       <Route path="/AddContent" Component={Addcontent} exact />
       <Route path="/add_course" Component={Addcourse} exact />
       <Route path="/StudentMainPage" Component={StudentDashboard} exact />
       <Route path="/Student_dashboard" Component={StudentDashboard} exact />
       <Route path="/my_courses" Component={StudentCourses} exact />
       <Route path="/home" Component={Home} exact />
       <Route path="/edit_student" Component={EditStudent} exact />
       {/* <Route path="/contact" Component={ContactPage} exact /> */}
       <Route path="/about" Component={About} exact />
       <Route path="/login" Component={SignIn} exact />
       <Route path="/Studentcontents" Component={StudentContent} exact />
       <Route path="/AdminTeacherCourses" Component={ATeacherCourses} />
       <Route path="/Adminpanel" Component={AdminPanel} />
       <Route path="/Adminka" Component={AdminPanelash} />
       <Route path="/analytics" Component={AnalyticsPage} />
       <Route path="/teacher_courses" Component={Allcourses} />
       <Route path="/teacher_dashboard" Component={TeacherDashboard} exact />
       <Route path="/student_dashboard" Component={StudentDashboard} exact />
       <Route path="/terms" Component={TermsOfService} exact />
       <Route path="/privacy" Component={PrivacyPolicy} exact />
       <Route path="/teacherstats" Component={PolarAreaChart  } exact />
      </Routes>
      <ToastContainer />
    </div>
   
  )
}

export default Direct
