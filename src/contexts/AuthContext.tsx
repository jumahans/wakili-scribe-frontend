import React, { createContext, useContext, useState, useCallback } from 'react';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string) => {
    // Mock login - in production, this would call the Django API
    const mockUser: User = {
      id: '1',
      email,
      name: 'Adv. Jane Doe',
      role: 'senior_counsel',
      firmId: 'firm-001',
      firmName: 'Kimani & Associates',
      subscriptionTier: 'enterprise',
      credits: 50000,
    };
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
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
