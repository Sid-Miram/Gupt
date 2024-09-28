import HomeScreen from "./pages/HomeScreen.jsx"
import RegistrationScreen from "./pages/RegistrationScreen.jsx"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

function App() {
  return ( 
    <BrowserRouter>
      <Routes> 
        <Route path="/" element = {<HomeScreen/>} />
        <Route path="/signup" element = {<RegistrationScreen/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

