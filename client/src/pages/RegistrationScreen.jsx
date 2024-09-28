import styles from "../styles/RegistrationScreen.module.css";
import { useState } from "react";
import { Icon } from "@iconify-icon/react";

function DisplayPassword({ isDisplay }) {
  return (
    <div className={styles.password}>
      {isDisplay ? <Icon icon="mdi:eye" /> : <Icon icon="mdi:eye-off" />}
    </div>
  );
}

function RegistrationScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("https://s47-sid-capstone-gupt.onrender.com/signup", {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {'Content-type': 'application/json'},
        
      })

      if (res.ok){
        window.location.href = "/"
      } else{
        const errorData = await res.json();
        console.log("SignUp error: ", errorData);
      }
      
    } catch (error) {
      console.log(err)
    }
    setEmail("");
    setPassword("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.Registration}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="button" className={styles.buttonClass} onClick={() => setShowPassword(!showPassword)}>
            <DisplayPassword isDisplay={showPassword} />
          </button>
        </div>
        <button type="submit" className={styles.buttonClass}>Submit</button>
      </form>
    </div>
  );
}

export default RegistrationScreen;
