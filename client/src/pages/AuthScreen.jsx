import React, { useState } from "react";
import styles from "../styles/AuthScreen.module.css"; 
import RegistrationScreen from "./RegistrationScreen.jsx";
import LoginScreen from "./LoginScreen.jsx";

function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.authContainer}>
      {/* Button Container */}
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.toggleButton} ${isLogin ? styles.activeTab : ""}`}
          onClick={handleToggle}
        >
          Login
        </button>
        <button
          className={`${styles.toggleButton} ${!isLogin ? styles.activeTab : ""}`}
          onClick={handleToggle}
        >
          Signup
        </button>
      </div>
      {/* Screen Wrapper */}
      <div className={styles.screenWrapper}>
        <div className={`${styles.screen} ${isLogin ? styles.activeScreen : ""}`}>
          {/* Login Form */}
          <LoginScreen />
        </div>
        <div className={`${styles.screen} ${!isLogin ? styles.activeScreen : ""}`}>
          {/* Signup Form */}
          <RegistrationScreen />
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
