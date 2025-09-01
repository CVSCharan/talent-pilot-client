import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Container } from "../components/layout";
import api from "../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let redirectTimeout: NodeJS.Timeout;

    if (!token) {
      setStatus("error");
      setMessage(
        "No verification token found. Please check the link and try again."
      );
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await api.fetch(
          `${
            import.meta.env.VITE_BASE_API_URL
          }/auth/verify-email?token=${token}`,
          {
            method: "GET",
            signal,
          }
        );

        if (signal.aborted) return;

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Verification failed");
        }

        setStatus("success");
        setMessage(
          "Your email has been successfully verified! Redirecting to login..."
        );
        redirectTimeout = setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setStatus("error");
          setMessage(
            error.message ||
              "An error occurred during verification. Please try again later."
          );
        }
      }
    };

    verifyToken();

    return () => {
      abortController.abort();
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [token, navigate]);

  return (
    <Container>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-4 sm:p-6 md:p-8">
          <Card className="bg-glass rounded-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-foreground">
                Email Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">{message}</p>
              {status === "verifying" && (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              {status === "success" && (
                <Button asChild>
                  <Link to="/login">Login Now</Link>
                </Button>
              )}
              {status === "error" && (
                <Button asChild>
                  <Link to="/signup">Back to Sign Up</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default VerifyEmail;
