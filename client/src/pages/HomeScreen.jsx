import NavBar from "../components/NavBar.jsx";
import Button from "../components/Button.jsx";
import styles from "../styles/HomeScreen.module.css";
import { useAuthStatus } from "../services/state/authStore.js";

function HomeScreen() {
  console.log(useAuthStatus((state) => state.loggedIn));
  return (
    <>
      <NavBar />

      <div className={styles.title}>
        <h1>G U P T</h1>
      </div>

      <Button name=" L A U N C H " id={styles.launch} />
    </>
  );
}

export default HomeScreen;
