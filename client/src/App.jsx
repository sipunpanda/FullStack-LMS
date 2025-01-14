import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import NotFound from './Pages/NotFound.jsx'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import CourseList from './Pages/Course/CourseList.jsx'
import Contact from './Pages/Contact.jsx'
import Denied from './Pages/Denied.jsx'
import CourseDescription from './Pages/Course/CourseDescription.jsx'
import RequireAuth from './Components/Auth/RequireAuth.jsx'
import CreateCourse from './Pages/Course/CreateCourse.jsx'
import Profile from './Pages/User/Profile.jsx'
import EditProfile from './Pages/User/EditProfile.jsx'

function App() {

  return (
    <>
   <Routes>
    <Route path='/' element ={<HomePage /> } > </Route>
    <Route path='/about' element ={<AboutUs /> } > </Route>
    <Route path='/courses' element ={<CourseList /> } > </Route>
    <Route path='/courses/description' element ={<CourseDescription /> } > </Route>
    <Route path='/contact' element ={<Contact /> } > </Route>
    <Route path='/denied' element ={<Denied /> } > </Route>
    <Route path='/signup' element ={<Signup /> } > </Route>
    <Route path='/login' element ={<Login /> } > </Route>



    <Route  element ={<RequireAuth allowedRoles={["ADMIN"]} /> } >
    <Route path='/course/create' element ={<CreateCourse /> } > </Route>

    
     </Route>

    <Route  element ={<RequireAuth allowedRoles={["ADMIN","USER"]} /> } >
    <Route path='/user/profile' element ={<Profile />} > </Route>
    <Route path='/user/editprofile' element ={<EditProfile />} > </Route>

    
     </Route>



    <Route path='*' element ={<NotFound />} > </Route>
    </Routes>
    </>
  )
}

export default App
