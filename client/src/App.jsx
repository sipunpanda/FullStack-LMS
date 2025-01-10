import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import NotFound from './Pages/NotFound.jsx'
import Signup from './Pages/Signup.jsx'

function App() {

  return (
    <>
   <Routes>
    <Route path='/' element ={<HomePage /> } > </Route>
    <Route path='/about' element ={<AboutUs /> } > </Route>
    <Route path='/signup' element ={<Signup /> } > </Route>
    <Route path='*' element ={<NotFound />} > </Route>
    </Routes>
    </>
  )
}

export default App
