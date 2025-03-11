import { useAuthStatus } from "../services/state/authStore.js";

export const useLogout = () => {
  const { setLogout } = useAuthStatus(); // Zustand store function to update logout state

  const logout = async () => {
    try {
      const serverUrl = import.meta.env.VITE_BASE_SERVER_URL;
      const res = await fetch(`${serverUrl}/logout`, {
        method: "POST",
        credentials: "include", // Send cookies along with the request
      });

      const data = await res.json(); // Optionally use the response data (e.g., success message)

      if (!res.ok) {
        throw new Error("Logout Unsuccessful");
      }

      setLogout(); // Calling setLogout to update the Zustand store (e.g., clearing user data or authentication state)

      return data; // Optionally return the response data
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return { logout };
};




// one issue, we're missing is.... when cookie expire? for that i'm planning to store iat of jwt and match it whenever user goes for a request and change the jwt when the expiry date is near for UX.
