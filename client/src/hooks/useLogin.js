import { useState } from "react"
import { useAuthStatus } from "../services/state/authStore.js"
import { validateLogin } from "../utils/validation.js";

export const useLogin =  () => {

  const { setLogin } = useAuthStatus();
  const serverUrl = import.meta.env.VITE_BASE_SERVER_URL;
  const login = async (email, password) => {
  

    // Validate input fields
    let validationError = validateLogin({email, password});

    if(validationError){
      throw new Error(validationError);
    }

    // Handle login submission here
    try {
      const res = await fetch(`${serverUrl}/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email,  password }), // Include username
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();

      if(data.errors){
        console.log(data.errors.email);
        throw new Error(`Error: ${data.errors.email}`);
      }

      if(!res.ok){
        throw new Error(`Failed to Login : ${res.statusText}`)
      }

      console.log(data);
    
      setLogin(); // calling login function from zustand authStore. 

    } catch(err){
      throw new Error(err.message);
    }
  

  };
  
  return { login }
} 
