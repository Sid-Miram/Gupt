import HomeScreen from "./pages/HomeScreen.jsx"
import RegistrationScreen from "./pages/RegistrationScreen.jsx"
import DocsScreen from "./pages/DocsScreen.jsx"
import AboutUsScreen from "./pages/AboutUsScreen.jsx"
import AuthScreen from "./pages/AuthScreen.jsx"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

function App() {
  return ( 
    <BrowserRouter>
      <Routes> 
        <Route path="/" element = {<HomeScreen/>} />
        <Route path="/signup" element = {<AuthScreen/>} />
        <Route path="/docs" element = {<DocsScreen/>} />
        <Route path='/aboutus' element = {<AboutUsScreen/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
