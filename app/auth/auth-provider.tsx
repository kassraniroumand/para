"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchAuthSession, signOut, getCurrentUser } from "aws-amplify/auth";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { signIn } from 'aws-amplify/auth';

// Cookie names
const ACCESS_TOKEN_COOKIE = 'amplify-accessToken';
const ID_TOKEN_COOKIE = 'amplify-idToken';
const REFRESH_TOKEN_COOKIE = 'amplify-refreshToken';

// Types
interface DecodedToken {
  sub: string;
  email?: string;
  exp: number;
  iat: number;
  'cognito:groups'?: string[];
  [key: string]: any;
}

interface User {
  id: string;
  email?: string;
  username?: string;
  isAdmin: boolean;
  attributes?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
  getIdToken: () => string | null;
  refreshTokens: () => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to store tokens in cookies
  const storeTokensInCookies = (accessToken: string, idToken: string, refreshToken?: string) => {
    const cookieOptions = {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const
    };

    Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, cookieOptions);
    Cookies.set(ID_TOKEN_COOKIE, idToken, cookieOptions);
    if (refreshToken) {
      Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, cookieOptions);
    }

    return { accessToken, idToken, refreshToken };
  };

  // Get stored tokens
  const getTokens = () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE);
    const idToken = Cookies.get(ID_TOKEN_COOKIE);
    const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);

    if (!accessToken || !idToken) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(accessToken);
      const expiration = decoded.exp * 1000; // Convert to milliseconds

      // Check if token is expired
      if (expiration < Date.now()) return null;

      return { accessToken, idToken, refreshToken, decoded };
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  };

  // Clear tokens (for logout)
  const clearTokens = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(ID_TOKEN_COOKIE);
    Cookies.remove(REFRESH_TOKEN_COOKIE);
  };

  // Get current user from Amplify
  const fetchCurrentUser = async (): Promise<User | null> => {
    try {
      const userData = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      const tokens = getTokens();
      const isAdmin = tokens?.decoded?.['cognito:groups']?.includes('admin') || false;

      return {
        id: userData.userId,
        username: userData.username,
        email: attributes.email,
        attributes,
        isAdmin
      };
    } catch (err) {
      console.error('Error fetching current user:', err);
      return null;
    }
  };

  // Fetch user attributes
  const fetchUserAttributes = async () => {
    try {
      // This would normally use Amplify's fetchUserAttributes, but we're simplifying
      const currentUser = await getCurrentUser();
      return currentUser.signInDetails?.loginId
        ? { email: currentUser.signInDetails.loginId }
        : {};
    } catch (err) {
      console.error('Error fetching user attributes:', err);
      return {};
    }
  };

  // Refresh tokens
  const refreshTokens = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const session = await fetchAuthSession({ forceRefresh: true });

      if (!session.tokens) {
        setError('No tokens returned during refresh');
        return false;
      }

      const { accessToken, idToken } = session.tokens;
      const refreshToken = (session.tokens as any).refreshToken;

      if (!accessToken || !idToken) {
        setError('Invalid tokens returned during refresh');
        return false;
      }

      storeTokensInCookies(
        accessToken.toString(),
        idToken.toString(),
        refreshToken?.toString()
      );

      // Also update the user data if we have refreshed tokens
      const userData = await fetchCurrentUser();
      if (userData) {
        setUser(userData);
      }

      setError(null);
      return true;
    } catch (err) {
      console.error('Error refreshing tokens:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh authentication');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      await signIn({ username, password });
      return await refreshTokens();
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await signOut();
      clearTokens();
      setUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
      // Still clear tokens even if signOut fails
      clearTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Access token getter
  const getAccessToken = (): string | null => {
    const tokens = getTokens();
    return tokens?.accessToken || null;
  };

  // ID token getter
  const getIdToken = (): string | null => {
    const tokens = getTokens();
    return tokens?.idToken || null;
  };

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // First check if we have valid tokens
        const tokens = getTokens();

        if (!tokens) {
          // No valid tokens, try to refresh
          const refreshed = await refreshTokens();
          if (!refreshed) {
            setUser(null);
            setIsLoading(false);
            return;
          }
        }

        // Get user data
        const userData = await fetchCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  console.log('AuthProvider user:', user);
  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    error,
    login,
    logout,
    getAccessToken,
    getIdToken,
    refreshTokens
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
