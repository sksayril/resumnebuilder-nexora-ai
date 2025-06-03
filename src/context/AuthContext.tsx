import React, { createContext, useContext, useState, useEffect } from 'react';

interface Wallet {
  balance: number;
  leadsCoins: number;
  transactions: any[];
}

interface Subscription {
  isActive: boolean;
  plan: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  securityQuestion: string;
  securityAnswer: string;
  role?: string;
  token?: string;
  wallet?: Wallet;
  subscription?: Subscription;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, securityQuestion: string, securityAnswer: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.datahive.co.in/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to log in');
      }

      // Store user data and token
      const userData = {
        ...data.user,
        token: data.token
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      setUser(userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to log in. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, securityQuestion: string, securityAnswer: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.datahive.co.in/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          securityQuestion,
          securityAnswer
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      // Store user data and token
      const userData = {
        ...data.user,
        securityQuestion,
        securityAnswer,
        token: data.token
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      setUser(userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign up. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      // Here you would typically make an API call to your backend
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (err) {
      setError('Failed to logout. Please try again.');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 