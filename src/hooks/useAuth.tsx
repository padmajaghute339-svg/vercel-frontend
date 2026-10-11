import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, OrderAddress } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string, role?: 'customer' | 'admin') => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  saveAddress: (address: OrderAddress) => void;
  toggleAdminMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'crunchycraft_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        id: 'usr_guest_01',
        name: 'Arjun Sharma',
        email: 'arjun.sharma@example.com',
        phone: '+91 98765 43210',
        role: 'customer',
        savedAddresses: [
          {
            fullName: 'Arjun Sharma',
            email: 'arjun.sharma@example.com',
            phone: '+91 98765 43210',
            street: '42, Heritage Enclave, Civil Lines',
            city: 'Jaipur',
            state: 'Rajasthan',
            pincode: '302006',
            country: 'India',
          }
        ]
      };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [user]);

  const login = async (email: string, _password?: string, role: 'customer' | 'admin' = 'customer') => {
    const isMockAdmin = email.toLowerCase().includes('admin') || role === 'admin';
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: isMockAdmin ? 'Chief Confectioner (Admin)' : (email.split('@')[0] || 'Royal Patron'),
      email,
      phone: '+91 98290 12345',
      role: isMockAdmin ? 'admin' : 'customer',
      savedAddresses: [
        {
          fullName: 'Arjun Sharma',
          email,
          phone: '+91 98290 12345',
          street: '108, Spice Market Rd, Sadar Bazar',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110006',
          country: 'India',
        }
      ]
    };
    setUser(newUser);
  };

  const signup = async (name: string, email: string) => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone: '+91 98111 22334',
      role: 'customer',
      savedAddresses: []
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const saveAddress = (address: OrderAddress) => {
    setUser((prev) => {
      if (!prev) return null;
      const addresses = prev.savedAddresses || [];
      return {
        ...prev,
        savedAddresses: [address, ...addresses.filter(a => a.street !== address.street)],
      };
    });
  };

  const toggleAdminMode = () => {
    setUser((prev) => {
      if (!prev) {
        return {
          id: 'usr_admin',
          name: 'Chief Confectioner (Admin)',
          email: 'admin@crunchycraft.com',
          role: 'admin',
        };
      }
      return {
        ...prev,
        role: prev.role === 'admin' ? 'customer' : 'admin',
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        signup,
        logout,
        updateProfile,
        saveAddress,
        toggleAdminMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
