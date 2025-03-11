import { useState, useEffect } from "react";
import { useAuthStatus } from "../services/state/authStore.js";
import { validateSignup } from "../utils/validation.js";

export const useSignup = () => {
  const { setLogin } = useAuthStatus(); // Get the login function from the store

  const signup = async (email, username, password) => {

    const validationError = validateSignup({ email, username, password });
    
    if (validationError) { 
      throw new Error(validationError);
    }

    const provider = "local";
    // Submit form
    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, username, password, provider }), // Include username
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();

      if (data.errors) {
        throw new Error(`Failed to register: ${data.errors.email}`);
        console.log(data.errors)
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to register: ${res.statusText}`);
        return;
      }

      // Successfully signed up
      setLogin(); // Calling login function from Zustand

    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    } 
  };


  return { signup };
};
