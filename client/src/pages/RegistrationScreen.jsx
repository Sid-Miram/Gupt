import styles from "../styles/RegistrationScreen.module.css";
import { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react"; // Ensure MDI icons are imported
import { Toaster, toast } from "sonner";
import { useSignup } from "../hooks/useSignup.js";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false)
  const { signup } = useSignup();
  const navigate = useNavigate();

  // Handles form submission

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try{
      setLoading(true)
      await signup(email, username, password);
      toast.success("Registration Succesful");
      setLoading(false)

      navigate("/")

      } catch(err) {
        setLoading(false)
        toast.error(err.message)
        
      }
  
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
        <button type="submit" className={styles.buttonClass} disabled = {loading}>
          {loading ? "Connecting" : "Connect Me!"}
        </button>
      </form>
      <Toaster richColors />
    </div>
  );
}

export default RegistrationScreen;
