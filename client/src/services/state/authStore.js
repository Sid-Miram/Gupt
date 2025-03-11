import { create } from "zustand";

export const useAuthStatus = create((set) => ({
  loggedIn: null, // initial state 
  
  // Login and Logout Functions
  setLogin: () => set({loggedIn: true}),
  setLogout: () => set({loggedIn: false})

}))
