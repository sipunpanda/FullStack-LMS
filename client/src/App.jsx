import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'

function App() {

  return (
    <>
   <Routes>
    <Route path='/' element ={<HomePage /> } > </Route>
    </Routes>
    </>
  )
}

export default App
