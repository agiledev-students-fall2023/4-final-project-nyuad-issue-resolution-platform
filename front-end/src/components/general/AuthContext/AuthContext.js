import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Modified function to check authentication
  const checkAuthentication = () => {
    axios.get(`${BASE_URL}/api/check-auth`, { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(response.data.authenticated);
        setIsAuthCheckComplete(true);
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        setIsAuthCheckComplete(true);
      });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuthentication, isAuthCheckComplete }}>
      {children}
    </AuthContext.Provider>
  );
};
