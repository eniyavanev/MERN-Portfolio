import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Custom hook to check if the user is authenticated
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get token from cookies
    const token = Cookies.get('token');
    console.log('Token retrieved from cookies:', token); // Debugging: check if the token is retrieved
    // Set authentication status based on token presence
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

export default useAuth;
