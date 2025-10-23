import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      // 🔥 REPLACE WITH YOUR ACTUAL BACKEND URL
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/auth/me.php`, {
        method: 'GET',
        credentials: 'include', // IMPORTANT: This sends session cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
          console.log('✅ Auth check successful:', data.user);
        } else {
          setUser(null);
          setError('Not authenticated');
        }
      } else if (response.status === 401) {
        // User not authenticated
        setUser(null);
        setError('Not authenticated');
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setError('Failed to check authentication status');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // 🔥 REPLACE WITH YOUR ACTUAL BACKEND URL
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/auth/logout.php`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null);
        setError(null);
        console.log('✅ Logout successful');
        
        // Clear any localStorage
        localStorage.removeItem('authData');
        localStorage.removeItem('userData');
        
        // Redirect to login page
        window.location.href = 'https://user.gamius.ma/login';
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      setError('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    checkAuthStatus,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
