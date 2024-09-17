import NavBar from "../components/NavBar.jsx"
import Button from "../components/Button.jsx" 
import "../styles/HomeScreen.css"


function HomeScreen(){
    
    return (
    <>
      <NavBar/> 

      <div className = 'title'>
          <h1>G U P T</h1>
      </div>

      <Button name=" L A U N C H "
        id="launch"
      />
    
    </>
    )
    }


export default HomeScreen;
