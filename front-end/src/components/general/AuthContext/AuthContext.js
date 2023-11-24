import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
      );

    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    // Function to check authentication
    const checkAuthentication = () => {
      axios.get(`${BASE_URL}/api/check-auth`, { withCredentials: true })
        .then((response) => {
          setIsAuthenticated(response.data.authenticated);
          localStorage.setItem('isAuthenticated', 'true');
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          setIsAuthenticated(false);
          localStorage.setItem('isAuthenticated', 'false');
        });
    };

    useEffect(() => {
      checkAuthentication();
    }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
