import React, { createContext, useContext, useState, useCallback } from 'react';
import { authApi } from '@/api/api';

export type UserRole = 'senior_counsel' | 'associate' | 'junior_associate' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  firmId: string;
  firmName: string;
  subscriptionTier: 'solo' | 'boutique' | 'enterprise' | null;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  setUser: (user: User | null) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    const { access_token, refresh_token, user } = response.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user', JSON.stringify(user));

    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const hasPermission = useCallback((permission: string) => {
    if (!user) return false;

    const permissions: Record<UserRole, string[]> = {
      senior_counsel: ['view_all', 'edit_all', 'dispatch', 'verify', 'export', 'manage_team', 'manage_dictionary', 'view_audit'],
      associate: ['view_all', 'edit_transcript', 'verify', 'export'],
      junior_associate: ['view_assigned', 'edit_transcript', 'verify'],
      admin: ['view_all', 'edit_all', 'dispatch', 'verify', 'export', 'manage_team', 'manage_dictionary', 'view_audit', 'manage_billing'],
    };

    return permissions[user.role].includes(permission);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      hasPermission,
      setUser, 
    }}>
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