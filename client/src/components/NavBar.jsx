import { Link } from 'react-router-dom';
import "../styles/NavBar.css"

function NavBar(){

  return (
    <nav>
      <p className ="Matrix">[M a t r i x] </p>
      <div className = "Clickables">
        <Link to="/aboutus">AboutUs</Link>
        <Link to="/docs">Documentation</Link>
        <Link to ="/signup">SignUp</Link>
        </div>
    </nav>

  )
}

export default NavBar;
