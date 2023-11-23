import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Modified function to check authentication
  const checkAuthentication = () => {
    axios.get(`${BASE_URL}/api/check-auth`, { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(response.data.authenticated);
        setUserRole(response.data.user.userType);
        setIsAuthCheckComplete(true);
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        setUserRole(null);
        setIsAuthCheckComplete(true);
      });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole, checkAuthentication, isAuthCheckComplete }}>
      {children}
    </AuthContext.Provider>
  );
};
