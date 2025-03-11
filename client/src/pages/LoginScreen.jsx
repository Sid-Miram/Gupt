import React, { useState } from "react";
import styles from "../styles/RegistrationScreen.module.css";
import { Icon } from "@iconify-icon/react";
import { Toaster, toast } from "sonner";
import { useLogin } from "../hooks/useLogin.js";
import getGoogleOAuthUrl from "../utils/getGoogleAuth.js";
import { useNavigate } from "react-router-dom";

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
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      toast.success("Login Successful");
      navigate("/")
    } catch (err) {
      toast.error(err.message);
      throw new Error(err.message);
    }
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
        <a href={getGoogleOAuthUrl()}> Login With Google </a>
      </form>
      <Toaster richColors />
    </div>
  );
}

export default LoginScreen;
