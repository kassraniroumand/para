# Simplified Authentication System

This folder contains a simplified authentication system for Next.js using AWS Amplify and React Context.

## Key Features

- **Single Source of Truth**: Authentication state is managed in one place using React Context
- **Server-Compatible**: Stores tokens in cookies for server-side access
- **Admin Authorization**: Built-in support for admin-only routes
- **Automatic Token Refresh**: Handles token expiration and refresh
- **Clean API**: Simple, intuitive hooks for auth operations

## Components

- `auth-provider.tsx`: The main authentication provider using React Context
- `amplify-config.tsx`: Configures AWS Amplify on the client side

## How to Use

### Setup

1. Wrap your application with the auth providers:

```tsx
import { AmplifyConfigProvider } from "@/app/auth/amplify-config";
import { AuthProvider } from "@/app/auth/auth-provider";

export default function RootLayout({ children }) {
  return (
    <AmplifyConfigProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </AmplifyConfigProvider>
  );
}
```

### Using Auth in Components

```tsx
"use client";

import { useAuth } from "@/app/auth/auth-provider";

export function MyComponent() {
  const {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    error,
    login,
    logout,
    getAccessToken
  } = useAuth();

  // Use the auth state and functions as needed

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.email}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login("username", "password")}>Login</button>
      )}
    </div>
  );
}
```

### Protecting Routes

```tsx
import { ProtectedRoute } from "@/app/components/auth/protected-route";

export default function SecurePage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}

// For admin-only pages
export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <div>This content is only visible to admins</div>
    </ProtectedRoute>
  );
}
```

## Authentication Flow

1. On app initialization, the auth provider checks for existing tokens in cookies
2. If valid tokens exist, it loads the user data
3. If tokens don't exist or are expired, it attempts to refresh them
4. Login/logout functions manage tokens and user state

## Security Notes

- Tokens are stored in cookies with secure and sameSite flags (in production)
- Token validation includes expiration checks
- Admin authorization is checked on both client and server (middleware)
