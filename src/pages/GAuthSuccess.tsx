"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

import useAuthStore from "../store/auth-store";

// Client component that safely uses useSearchParams
const AuthSuccessContent: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(3);
  const [redirectInitiated, setRedirectInitiated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTokenAndFetchUser } = useAuthStore();

  // Use useCallback to memoize the redirect function
  const handleRedirect = useCallback(() => {
    if (!redirectInitiated) {
      setRedirectInitiated(true);
      setTimeout(() => {
        navigate("/results");
      }, 0);
    }
  }, [navigate, redirectInitiated]);

  // Function to start countdown timer
  const startCountdown = useCallback(() => {
    // Set initial countdown value
    setCountdown(3);

    // Create timer that decrements every second
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newValue = prev - 1;
        if (newValue <= 0) {
          clearInterval(timer);
          handleRedirect();
          return 0;
        }
        return newValue;
      });
    }, 1000);

    // Return cleanup function
    return timer;
  }, [handleRedirect]);

  useEffect(() => {
    // Only proceed if we haven't already initiated a redirect
    if (redirectInitiated) return;

    // Get token from URL
    const token = searchParams.get("token");

    let timer: NodeJS.Timeout | null = null;

    // Process the token if it exists
    if (token) {
      setTokenAndFetchUser(token)
        .then(() => {
          // Start countdown after successful authentication
          timer = startCountdown();
        })
        .catch((err) => {
          console.error("Error setting token and fetching user profile:", err);
          setError("Failed to authenticate. Please try again.");
          // Redirect to login after a short delay
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        });
    } else {
      // No token found, redirect to login
      console.warn("No token found, redirecting to login");
      navigate("/login");
    }

    // Cleanup function
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [
    searchParams,
    handleRedirect,
    redirectInitiated,
    navigate,
    startCountdown,
    setTokenAndFetchUser,
  ]);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10 flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="rounded-xl border border-border/40 shadow-sm overflow-hidden">
            <div className="bg-card p-6 sm:p-8 md:p-10 rounded-[10px] text-center">
              {error ? (
                <>
                  <div className="flex justify-center mb-6">
                    <XCircle className="h-20 w-20 text-destructive" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-4 text-destructive">
                    Authentication Failed
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground mb-2">
                    {error}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to login page...
                  </p>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-6">
                    <CheckCircle className="h-20 w-20 text-primary" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-4">
                    Authentication Successful!
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground mb-2">
                    You have been successfully authenticated.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to results in{" "}
                    <span className="font-medium text-foreground">
                      {countdown}
                    </span>{" "}
                    seconds...
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

// Loading fallback component
const LoadingFallback = () => {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10 flex-grow flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    </main>
  );
};

// Main page component
const AuthSuccessPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthSuccessContent />
    </Suspense>
  );
};

export default AuthSuccessPage;