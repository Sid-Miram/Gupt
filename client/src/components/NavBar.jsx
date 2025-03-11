import { Link } from 'react-router-dom';
import "../styles/NavBar.css"
import { useAuthStatus } from "../services/state/authStore.js";
import { useLogout } from "../hooks/useLogout.js";
function NavBar(){
  
  const { logout } = useLogout();
  const { loggedIn } = useAuthStatus();

  const handleClick =  async (event) =>{
    event.preventDefault()
    try {
      await logout(); 
    } catch (error) {
      throw new Error(error);
    }
  } 

  return (
    <nav>
      <p className ="Matrix">[M a t r i x] </p>
      <div className = "Clickables">
        <Link to="/aboutus">AboutUs</Link>
        <Link to="/docs">Documentation</Link>
        { loggedIn ? <a onClick = {handleClick}> Logout </a> : <Link to ="/signup">SignUp</Link>}
        </div>
    </nav>

  )
}

export default NavBar;
