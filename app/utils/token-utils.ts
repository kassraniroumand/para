"use client";

import { fetchAuthSession } from "aws-amplify/auth";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export interface DecodedToken {
  sub: string;
  email?: string;
  exp: number;
  iat: number;
  [key: string]: any;
}

export interface TokenInfo {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  expiresAt: Date;
  isValid: boolean;
  decoded?: DecodedToken;
}

// Cookie names
const ACCESS_TOKEN_COOKIE = 'amplify-accessToken';
const ID_TOKEN_COOKIE = 'amplify-idToken';
const REFRESH_TOKEN_COOKIE = 'amplify-refreshToken';

// Fetch the current auth tokens
export async function getTokens(): Promise<TokenInfo | null> {
  try {
    const session = await fetchAuthSession({ forceRefresh: false });

    if (!session || !session.tokens) {
      return null;
    }

    const { accessToken, idToken } = session.tokens;
    // Handle refreshToken separately since it might not be in the type
    const refreshToken = (session.tokens as any).refreshToken;

    if (!accessToken || !idToken) {
      return null;
    }

    const accessTokenStr = accessToken.toString();
    const idTokenStr = idToken.toString();
    const refreshTokenStr = refreshToken?.toString();

    // Store tokens in cookies for server-side access
    // Set secure and same-site flags for production
    const cookieOptions = {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const
    };

    // Store tokens in cookies
    Cookies.set(ACCESS_TOKEN_COOKIE, accessTokenStr, cookieOptions);
    Cookies.set(ID_TOKEN_COOKIE, idTokenStr, cookieOptions);
    if (refreshTokenStr) {
      Cookies.set(REFRESH_TOKEN_COOKIE, refreshTokenStr, cookieOptions);
    }

    const decodedToken = jwtDecode<DecodedToken>(accessTokenStr);
    const expiresAt = new Date(decodedToken.exp * 1000);
    const isValid = expiresAt > new Date();

    return {
      accessToken: accessTokenStr,
      idToken: idTokenStr,
      refreshToken: refreshTokenStr,
      expiresAt,
      isValid,
      decoded: decodedToken
    };
  } catch (error) {
    console.error("Error fetching auth tokens:", error);
    return null;
  }
}

// Check if a token is expired
export function isTokenExpired(token: TokenInfo | null): boolean {
  if (!token) return true;
  return !token.isValid || new Date() > token.expiresAt;
}

// Get token from cookies (for client-side operations)
export function getTokenFromCookies(): TokenInfo | null {
  try {
    const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE);
    const idToken = Cookies.get(ID_TOKEN_COOKIE);
    const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);

    if (!accessToken || !idToken) {
      return null;
    }

    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    const expiresAt = new Date(decodedToken.exp * 1000);
    const isValid = expiresAt > new Date();

    return {
      accessToken,
      idToken,
      refreshToken,
      expiresAt,
      isValid,
      decoded: decodedToken
    };
  } catch (error) {
    console.error("Error getting tokens from cookies:", error);
    return null;
  }
}

// Clear tokens from cookies (for logout)
export function clearTokenCookies(): void {
  Cookies.remove(ACCESS_TOKEN_COOKIE);
  Cookies.remove(ID_TOKEN_COOKIE);
  Cookies.remove(REFRESH_TOKEN_COOKIE);
}
