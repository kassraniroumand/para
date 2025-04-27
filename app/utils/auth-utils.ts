"use client";

import {
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  signUp as amplifySignUp,
  confirmSignUp as amplifyConfirmSignUp,
  resetPassword as amplifyResetPassword,
  confirmResetPassword as amplifyConfirmResetPassword,
  fetchUserAttributes as amplifyFetchUserAttributes,
  getCurrentUser as amplifyGetCurrentUser
} from "aws-amplify/auth";

// Check if a user is currently authenticated
export const isAuthenticated = async () => {
  try {
    const user = await amplifyGetCurrentUser();
    return { authenticated: true, user };
  } catch (error) {
    return { authenticated: false, user: null };
  }
};

// Get current user details including attributes
export const getUserDetails = async () => {
  try {
    const user = await amplifyGetCurrentUser();
    const attributes = await amplifyFetchUserAttributes();
    return {
      success: true,
      user: {
        ...user,
        attributes
      }
    };
  } catch (error) {
    return { success: false, error };
  }
};

// Sign in a user using email as username
export const signInUser = async (username: string, password: string) => {
  try {
    const result = await amplifySignIn({ username, password });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

// Sign up a new user with email as username
export const signUpUser = async (email: string, password: string) => {
  try {
    const result = await amplifySignUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
        autoSignIn: true,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

// Confirm sign up with verification code
export const confirmSignUpUser = async (email: string, confirmationCode: string) => {
  try {
    const result = await amplifyConfirmSignUp({ username: email, confirmationCode });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

// Sign out the current user
export const signOutUser = async () => {
  try {
    await amplifySignOut();
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// Request a password reset
export const requestPasswordReset = async (email: string) => {
  try {
    const result = await amplifyResetPassword({ username: email });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

// Confirm password reset with new password and confirmation code
export const confirmPasswordReset = async (
  email: string,
  newPassword: string,
  confirmationCode: string
) => {
  try {
    const result = await amplifyConfirmResetPassword({
      username: email,
      newPassword,
      confirmationCode,
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

// Check if current user has admin role
export const isAdmin = async () => {
  try {
    const { success, user } = await getUserDetails();

    if (!success || !user) {
      return { isAdmin: false };
    }

    // Check for admin group in Cognito groups
    // This is the standard way in AWS Cognito
    const cognitoGroups = user.attributes?.['cognito:groups'];
    const isInAdminGroup = Array.isArray(cognitoGroups) && cognitoGroups.includes('admin');

    // Fallback to custom attributes if needed
    const hasAdminRole =
      user.attributes?.['custom:role'] === 'admin' ||
      user.attributes?.role === 'admin';

    return { isAdmin: isInAdminGroup || hasAdminRole, user };
  } catch (error) {
    console.error('Error checking admin status:', error);
    return { isAdmin: false, error };
  }
};
