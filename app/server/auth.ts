export const isAdmin = async () => {
  try {
    const user = await getUser();

    if (!user) {
      return { isAdmin: false };
    }

    // Check for admin group in Cognito groups
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
