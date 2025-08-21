import { Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

// Client component that safely uses useSearchParams
const AuthErrorContent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [errorMessage, setErrorMessage] = useState<string>(
    "There was a problem authenticating your account."
  );
  const [redirectPath, setRedirectPath] = useState("/login");
  const [buttonText, setButtonText] = useState("Return to Login");
  const [redirectText, setRedirectText] = useState("login");

  useEffect(() => {
    const error = searchParams.get("message") || searchParams.get("error");
    if (error) {
      const decodedError = decodeURIComponent(error);
      const isNoAccountError = decodedError.includes("no-account-found");
      setErrorMessage(
        isNoAccountError
          ? "No account found. Please register."
          : "Incorrect email or password."
      );
      setRedirectPath(isNoAccountError ? "/signup" : "/login");
      setButtonText(isNoAccountError ? "Register Now" : "Return to Login");
      setRedirectText(isNoAccountError ? "registration" : "login");
    }
  }, [searchParams, setErrorMessage, setRedirectPath, setButtonText, setRedirectText]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timer) clearInterval(timer);
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [navigate, redirectPath]);

  const handleButtonClick = () => {
    setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 0);
  };

  return (
    <main className="flex flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8 pt-12">
      <div className="w-full max-w-md mx-auto">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center">
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <CardTitle className="text-2xl sm:text-3xl font-bold text-destructive">
              Authentication Failed
            </CardTitle>
            <CardDescription className="px-4">
              {errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <Button onClick={handleButtonClick} className="mt-4">
              {buttonText}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Redirecting to {redirectText} in {countdown} seconds...
            </p>
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

const GAuthError = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthErrorContent />
    </Suspense>
  );
};

export default GAuthError;