"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import useAuthStore from "../store/auth-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

// Client component that safely uses useSearchParams
const AuthSuccessContent: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(3);
  const [redirectInitiated, setRedirectInitiated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTokenAndFetchUser } = useAuthStore();

  const handleRedirect = useCallback(() => {
    if (!redirectInitiated) {
      setRedirectInitiated(true);
      setTimeout(() => {
        navigate("/");
      }, 0);
    }
  }, [navigate, redirectInitiated]);

  const startCountdown = useCallback(() => {
    setCountdown(3);
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
    return timer;
  }, [handleRedirect]);

  useEffect(() => {
    if (redirectInitiated) return;

    const token = searchParams.get("token");
    let timer: NodeJS.Timeout | null = null;

    if (token) {
      setTokenAndFetchUser(token)
        .then(() => {
          timer = startCountdown();
        })
        .catch((err) => {
          console.error("Error setting token and fetching user profile:", err);
          setError("Failed to authenticate. Please try again.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        });
    } else {
      console.warn("No token found, redirecting to login");
      navigate("/login");
    }

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
    <main className="flex flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8 pt-12">
      <div className="w-full max-w-md mx-auto">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center">
            {error ? (
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            ) : (
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            )}
            <CardTitle
              className={`text-2xl sm:text-3xl font-bold ${
                error ? "text-destructive" : "text-foreground"
              }`}
            >
              {error ? "Authentication Failed" : "Authentication Successful"}
            </CardTitle>
            <CardDescription className="px-4">
              {error ? error : "You have been successfully authenticated."}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <p className="text-sm text-muted-foreground">
              {error
                ? "Redirecting to login..."
                : `Redirecting to the home page in ${countdown} seconds...`}
            </p>
            {!error && (
              <Button onClick={handleRedirect} className="mt-4">
                Go to Home Page
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

const LoadingFallback = () => {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10 flex-grow flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    </main>
  );
};

const AuthSuccessPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthSuccessContent />
    </Suspense>
  );
};

export default AuthSuccessPage;
