import React, { useEffect } from "react";
import { Header } from "./Header";
import useAuthStore from "../../store/auth-store";
import { Toaster } from "../ui/sonner";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    document.body.classList.add("bg-background");
    return () => {
      document.body.classList.remove("bg-background");
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-foreground antialiased">
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Toaster position="bottom-right" />
      <Footer />
    </div>
  );
};

export default Layout;
