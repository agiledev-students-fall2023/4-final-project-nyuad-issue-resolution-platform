import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userNetID, setUserNetID] = useState(null);
  const [userDept, setUserDept] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Modified function to check authentication
  const checkAuthentication = () => {
    axios.get(`${BASE_URL}/api/check-auth`, { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(response.data.authenticated);
        setUserRole(response.data.user.userType);
        setUserName(response.data.user.name);
        setUserNetID(response.data.user.netId);
        setUserDept(response.data.user.userDept);
        setIsAuthCheckComplete(true);
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        setUserRole(null);
        setUserName(null);
        setUserNetID(null);
        setUserDept(null);
        setIsAuthCheckComplete(true);
      });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuthentication, isAuthCheckComplete, userName, setUserName, userNetID, setUserNetID, userDept, setUserDept, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
