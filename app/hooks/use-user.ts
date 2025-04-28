// "use client";
//
// import { useAtom, useAtomValue, useSetAtom } from "jotai";
// import { useEffect } from "react";
//
// export function useUser() {
//   const [userState, setUserState] = useAtom(userAtom);
//   const fetchUser = useSetAtom(fetchUserAtom);
//   const isLoading = useAtomValue(isLoadingAtom);
//   const error = useAtomValue(userErrorAtom);
//   const isAuthenticated = useAtomValue(isAuthenticatedAtom);
//   const userName = useAtomValue(userNameAtom);
//   const userEmail = useAtomValue(userEmailAtom);
//
//   useEffect(() => {
//     if (!userState.user && !userState.isLoading) {
//       fetchUser();
//     }
//   }, [userState.user, userState.isLoading, fetchUser]);
//
//   // Check if user has admin role
//   const isAdmin = userState.user?.attributes?.['custom:role'] === 'admin' ||
//                  userState.user?.attributes?.role === 'admin';
//
//   return {
//     user: userState.user,
//     userAttributes: userState.user?.attributes as UserAttributes | undefined,
//     isLoading,
//     error,
//     isAuthenticated,
//     userName,
//     userEmail,
//     isAdmin,
//     refetch: fetchUser,
//   };
// }
//
// export function useUserName() {
//   return useAtomValue(userNameAtom);
// }
//
// export function useUserEmail() {
//   return useAtomValue(userEmailAtom);
// }
//
// export function useIsAuthenticated() {
//   return useAtomValue(isAuthenticatedAtom);
// }
//
// export function useUserLoading() {
//   return useAtomValue(isLoadingAtom);
// }
//
// export function useUserError() {
//   return useAtomValue(userErrorAtom);
// }
//
// export function useUserRefetch() {
//   return useSetAtom(fetchUserAtom);
// }
//
// // Utility hook to check if current user is an admin
// export function useIsAdmin() {
//   const { isAdmin, isLoading } = useUser();
//   return { isAdmin, isLoading };
// }
