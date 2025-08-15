import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import useAuthStore from "../../store/auth-store";
import { Toaster } from "../ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const noScrollPaths = ["/login", "/forgot-password", "/signup", "/testimonials"];
  const shouldHideScroll = noScrollPaths.includes(location.pathname);

  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {

    if (shouldHideScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [shouldHideScroll]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Layout;
