import React, { useState } from "react";
import styles from "../styles/RegistrationScreen.module.css"; // Adjust path as necessary
import { Icon } from "@iconify-icon/react"; // Import MDI icons
import { Toaster, toast } from "sonner";
import isEmail from "validator/es/lib/isEmail";

function DisplayPassword({ isDisplay }) {
  return (
    <div className={styles.password}>
      {isDisplay ? <Icon icon="mdi:eye" /> : <Icon icon="mdi:eye-off" />}
    </div>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate input fields
    if (!email) {
      toast.error("Please enter an email");
      return;
    }
    if (!isEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    // Handle login submission here
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email,  password }), // Include username
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      if(data.errors){
        throw new Error(`Error: ${data.errors.email}`);
      }
      if(!res.ok){
        throw new Error(`Failed to Login : ${res.statusText}`)
      }
      console.log(data);
      toast.success("Logged In Successfully")

    } catch(err){
      toast.error(`Error: ${err.message}`);
    }

      

    // Reset fields after submission
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.Login}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.buttonClass}
            onClick={() => setShowPassword(!showPassword)}
          >
            <DisplayPassword isDisplay={showPassword} />
          </button>
        </div>
        <button type="submit" className={styles.buttonClass}>
          Let me in!
        </button>
      </form>
      <Toaster richColors />
    </div>
  );
}

export default LoginScreen;
