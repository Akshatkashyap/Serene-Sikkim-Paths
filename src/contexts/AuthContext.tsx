import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/authAPI';

interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  showLoginModal: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  closeLoginModal: () => void;
  openLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = authAPI.getToken();
    const storedUser = authAPI.getUser();
    
    if (token && storedUser) {
      // Verify token is still valid by checking with backend
      authAPI.getMe().then(response => {
        if (response.success && response.user) {
          setIsLoggedIn(true);
          setUser(response.user);
        } else {
          // Token expired or invalid
          authAPI.logout();
          setShowLoginModal(true);
        }
      }).catch(() => {
        // Network error or server unavailable
        // Allow offline access if token exists
        setIsLoggedIn(true);
        setUser(storedUser);
      });
    } else {
      // Show login modal for new users
      const hasSeenLogin = localStorage.getItem('hasSeenLogin');
      if (!hasSeenLogin) {
        setShowLoginModal(true);
        localStorage.setItem('hasSeenLogin', 'true');
      }
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginTime', new Date().toISOString());
    setIsLoggedIn(true);
    setUser(userData);
    setShowLoginModal(false);
  };

  const logout = async () => {
    await authAPI.logout();
    setIsLoggedIn(false);
    setUser(null);
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const value = {
    isLoggedIn,
    showLoginModal,
    user,
    login,
    logout,
    closeLoginModal,
    openLoginModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};