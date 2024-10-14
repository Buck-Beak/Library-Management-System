"use client"
import "./globals.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { AuthProvider } from '../context/AuthContext';
//import Login from "./auth/login/page";

export default function RootLayout({ children }) {
  const [signedIn, setIsSignedIn] = useState(false);
  return (
    <AuthProvider>
      <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
      </html>
    </AuthProvider>
  );
}
