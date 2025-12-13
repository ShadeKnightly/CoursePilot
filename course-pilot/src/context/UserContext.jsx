import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Load from localStorage on startup
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const res = await fetch(`${API_BASE}/user/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if(!res.ok){
          throw new Error("Not authenticated");
        }
        const data = await res.json();
        setCurrentUser(data);
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [API_BASE]);


  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
