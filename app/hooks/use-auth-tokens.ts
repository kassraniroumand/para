"use client";

import { useState, useEffect, useCallback } from 'react';
import { getTokens, getTokenFromCookies, clearTokenCookies, TokenInfo, isTokenExpired } from '@/app/utils/token-utils';

export function useAuthTokens() {
  const [tokens, setTokens] = useState<TokenInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to get tokens from cookies
  const getTokensFromCookies = useCallback(() => {
    try {
      const cookieTokens = getTokenFromCookies();
      if (cookieTokens && !isTokenExpired(cookieTokens)) {
        setTokens(cookieTokens);
        return cookieTokens;
      }
      return null;
    } catch (err) {
      console.error('Error getting tokens from cookies:', err);
      return null;
    }
  }, []);

  // Function to fetch fresh tokens from Amplify
  const fetchFreshTokens = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const freshTokens = await getTokens();
      if (freshTokens) {
        setTokens(freshTokens);
        return freshTokens;
      }

      // If no fresh tokens, try getting from cookies as fallback
      const cookieTokens = getTokensFromCookies();
      if (cookieTokens) {
        return cookieTokens;
      }

      return null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch tokens';
      setError(message);

      // Try cookies as fallback if fresh token fetch fails
      const cookieTokens = getTokensFromCookies();
      if (cookieTokens) {
        return cookieTokens;
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [getTokensFromCookies]);

  // Function to clear tokens (for logout)
  const clearTokens = useCallback(() => {
    clearTokenCookies();
    setTokens(null);
  }, []);

  // Get the access token with validation
  const getAccessToken = useCallback(() => {
    if (tokens && !isTokenExpired(tokens)) {
      return tokens.accessToken;
    }

    // Try to get from cookies as backup
    const cookieTokens = getTokensFromCookies();
    if (cookieTokens) {
      return cookieTokens.accessToken;
    }

    return null;
  }, [tokens, getTokensFromCookies]);

  // Get the ID token with validation
  const getIdToken = useCallback(() => {
    if (tokens && !isTokenExpired(tokens)) {
      return tokens.idToken;
    }

    // Try to get from cookies as backup
    const cookieTokens = getTokensFromCookies();
    if (cookieTokens) {
      return cookieTokens.idToken;
    }

    return null;
  }, [tokens, getTokensFromCookies]);

  // Check if user is authenticated based on tokens
  const isAuthenticated = useCallback(() => {
    if (tokens && !isTokenExpired(tokens)) {
      return true;
    }

    // Check cookies as backup
    const cookieTokens = getTokensFromCookies();
    return cookieTokens !== null && !isTokenExpired(cookieTokens);
  }, [tokens, getTokensFromCookies]);

  // Initialize tokens from cookies on mount
  useEffect(() => {
    if (!tokens) {
      getTokensFromCookies();
    }
  }, [tokens, getTokensFromCookies]);

  return {
    tokens,
    isLoading,
    error,
    fetchFreshTokens,
    clearTokens,
    getAccessToken,
    getIdToken,
    isAuthenticated
  };
}
