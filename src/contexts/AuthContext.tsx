'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { User, AuthState } from '@/types';

interface AuthContextType {
  auth: AuthState;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, displayName: string) => Promise<boolean>;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Check for existing session
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('sparkvibe_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuth({
            isAuthenticated: true,
            user,
            loading: false,
          });
        } else {
          setAuth(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setAuth(prev => ({ ...prev, loading: false }));
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get stored users
      const storedUsers = localStorage.getItem('sparkvibe_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Find user
      const user = users.find((u: User) => u.email === email);
      
      if (!user) {
        toast.error('User not found. Please sign up first.');
        return false;
      }

      // In a real app, you'd verify the password hash
      const storedPassword = localStorage.getItem(`sparkvibe_password_${user.id}`);
      if (storedPassword !== password) {
        toast.error('Invalid password');
        return false;
      }

      // Set user session
      localStorage.setItem('sparkvibe_user', JSON.stringify(user));
      setAuth({
        isAuthenticated: true,
        user,
        loading: false,
      });

      toast.success('Welcome back!');
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('An error occurred during sign in');
      return false;
    }
  };

  const signUp = async (email: string, password: string, displayName: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get existing users
      const storedUsers = localStorage.getItem('sparkvibe_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if user already exists
      if (users.some((u: User) => u.email === email)) {
        toast.error('User already exists with this email');
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        displayName,
        preferences: {
          theme: 'light',
          notifications: true,
          newsletter: false,
        },
        createdAt: new Date().toISOString(),
      };

      // Store user
      users.push(newUser);
      localStorage.setItem('sparkvibe_users', JSON.stringify(users));
      localStorage.setItem(`sparkvibe_password_${newUser.id}`, password);
      localStorage.setItem('sparkvibe_user', JSON.stringify(newUser));

      setAuth({
        isAuthenticated: true,
        user: newUser,
        loading: false,
      });

      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('An error occurred during sign up');
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem('sparkvibe_user');
    setAuth({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
    toast.info('You have been signed out');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!auth.user) return;

    const updatedUser = { ...auth.user, ...updates };
    
    // Update in localStorage
    localStorage.setItem('sparkvibe_user', JSON.stringify(updatedUser));
    
    // Update users array
    const storedUsers = localStorage.getItem('sparkvibe_users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const userIndex = users.findIndex((u: User) => u.id === auth.user!.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('sparkvibe_users', JSON.stringify(users));
      }
    }

    setAuth(prev => ({
      ...prev,
      user: updatedUser,
    }));

    toast.success('Profile updated successfully!');
  };

  const value = {
    auth,
    signIn,
    signUp,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
