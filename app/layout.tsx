import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AmplifyConfigProvider } from "@/app/auth/amplify-config";
import { AuthProvider } from "@/app/auth/auth-provider";
import NavBar from "@/components/custom/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amplify Auth Demo",
  description: "Next.js app with AWS Amplify Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AmplifyConfigProvider>
          <AuthProvider>
            {/*<NavBar />*/}
            <div>
              {children}
            </div>
          </AuthProvider>
        </AmplifyConfigProvider>
      </body>
    </html>
  );
}
