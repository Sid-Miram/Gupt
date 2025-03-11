import { useEffect } from "react";
import { useAuthStatus } from "../services/state/authStore.js"; // assuming this is your state management hook
import { useNavigate } from "react-router-dom";

export const useCheckAuth = () => {
  const { setLogin, setLogout } = useAuthStatus();
  const navigate = useNavigate();
  const { loggedIn } = useAuthStatus();
  const serverUrl = import.meta.env.VITE_BASE_SERVER_URL;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${serverUrl}/jwt-verify`, {
          method: "GET",
          credentials: "include",
        });
        
        const data = await res.json();

        if (res.ok) {
          setLogin();
        } else {
          setLogout();
          console.log(data) 
        }
      } catch (error) {
        setLogout();
        navigate("/signup");
      }
    };

    checkAuth(); // Call the async function inside useEffect
  }, [navigate, setLogin, setLogout]); // Add navigate, setLogin, setLogout as dependencies
};
