import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import AboutUs from './Pages/AboutUs.jsx'

function App() {

  return (
    <>
   <Routes>
    <Route path='/' element ={<HomePage /> } > </Route>
    <Route path='/about' element ={<AboutUs /> } > </Route>
    </Routes>
    </>
  )
}

export default App
