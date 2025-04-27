import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

// Define protected paths that require admin access
const ADMIN_PATHS = ['/admin', '/admin/dashboard', '/admin/users', '/admin/settings'];

// Cookie names from auth system
const ACCESS_TOKEN_COOKIE = 'amplify-accessToken';

// Token interface
interface DecodedToken {
  exp?: number;
  'cognito:groups'?: string[];
  [key: string]: any;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path requires admin access
  const isAdminPath = ADMIN_PATHS.some(path =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  // If not an admin path, proceed normally
  if (!isAdminPath) {
    return NextResponse.next();
  }

  try {
    // Get access token from cookie
    const accessTokenCookie = request.cookies.get(ACCESS_TOKEN_COOKIE);
    console.log("accessTokenCookie", accessTokenCookie);

    if (!accessTokenCookie) {
      // No token found, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Decode and verify the token
    try {
      const decodedToken = jwtDecode<DecodedToken>(accessTokenCookie.value);

      // Check token expiration
      // const currentTime = Math.floor(Date.now() / 1000);
      // if (decodedToken.exp && decodedToken.exp < currentTime) {
      //   // Token expired, redirect to login
      //   return NextResponse.redirect(new URL('/login', request.url));
      // }

      // Check for admin group in Cognito groups
      const isInAdminGroup = decodedToken['cognito:groups']?.includes('admin') || false;

      if (!isInAdminGroup) {
        // Not an admin, redirect to home
        return NextResponse.redirect(new URL('/', request.url));
      }

      console.log("isInAdminGroup", isInAdminGroup);
      // Admin access granted, proceed
      return NextResponse.next();
    } catch (error) {
      // Error decoding token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    // Error handling cookies, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configure the middleware to run only on admin paths
export const config = {
  matcher: ['/admin/:path*'],
};
