import styles from "../styles/RegistrationScreen.module.css";
import { useState } from "react";
import { Icon } from "@iconify-icon/react"; // Ensure MDI icons are imported
import { Toaster, toast } from "sonner";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import isEmail from "validator/es/lib/isEmail";

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
  const [username, setUsername] = useState(""); // New username state
  const [showPassword, setShowPassword] = useState(false);

  // Handles form submission
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
    if (!username) {
      toast.error("Please enter a username");
      return;
    }
    if (!password) {
      toast.error("Please enter a password");
      return;
    }
    if (!isStrongPassword(password)) {
      toast.error("Please enter a strong password.");
      return;
    }

    // Submit form
    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, username, password }), // Include username
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();

      if(data.errors){
        throw new Error(`Failed to register: ${data.errors.email}`);
      }
      
      if (!res.ok) {
        throw new Error(`Failed to register: ${res.statusText}`);
      }
      
      toast.success("Registration successful!");
      location.assign('/');
      
      
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }

    // Reset form fields after submission
    setEmail("");
    setPassword("");
    setUsername(""); // Reset username
  };

  return (
    <div className={styles.Registration}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username" // Add Username field
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          Connect Me!
        </button>
      </form>
      <Toaster richColors />
    </div>
  );
}

export default RegistrationScreen;
