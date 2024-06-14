// frontend/app/layout.tsx

"use client";
import '../styles/globals.scss';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react"; // Used to wrap the useSession in AuthButton.tsx
import { Provider as ReduxProvider } from 'react-redux'; // Import Redux Provider
import store from '../store'; // Import your Redux store


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider store={store}> {/* Wrap with Redux Provider */}
          <SessionProvider>{children}</SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
