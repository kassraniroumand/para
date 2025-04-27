"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

// Define JWT token interface
interface CognitoToken {
  sub?: string;
  email?: string;
  username?: string;
  exp?: number;
  'cognito:groups'?: string[];
  [key: string]: any;
}

// Function to verify admin status server-side
export async function verifyAdminServer() {
  try {
    // Get cookies
    const cookieStore = cookies();

    // Find the access token cookie (Cognito format)
    const accessTokenCookie = cookieStore.getAll()
      .find(cookie =>
        cookie.name.includes('accessToken') ||
        cookie.name.includes('access_token')
      );

    if (!accessTokenCookie) {
      return { isAuthenticated: false, isAdmin: false };
    }

    // Decode the JWT token
    const decodedToken = jwtDecode<CognitoToken>(accessTokenCookie.value);

    // Check token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return { isAuthenticated: false, isAdmin: false };
    }

    // Check for admin in Cognito groups
    const isInAdminGroup = decodedToken['cognito:groups'] &&
                          Array.isArray(decodedToken['cognito:groups']) &&
                          decodedToken['cognito:groups'].includes('admin');

    return {
      isAuthenticated: true,
      isAdmin: isInAdminGroup,
      userId: decodedToken.sub || decodedToken.username,
      email: decodedToken.email,
      attributes: decodedToken
    };
  } catch (error) {
    console.error("Error verifying admin status:", error);
    return { isAuthenticated: false, isAdmin: false };
  }
}

// Middleware-like function to protect server components and route handlers
export async function requireAdmin() {
  const { isAuthenticated, isAdmin } = await verifyAdminServer();

  if (!isAuthenticated || !isAdmin) {
    // Redirect to login if not authenticated or not admin
    redirect("/login");
  }

  // If admin, continue execution
  return true;
}

// Get current admin user details
export async function getAdminUserDetails() {
  const result = await verifyAdminServer();

  if (!result.isAuthenticated || !result.isAdmin) {
    return null;
  }

  return {
    userId: result.userId,
    email: result.email,
    attributes: result.attributes
  };
}
