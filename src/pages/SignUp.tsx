import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState, useEffect } from "react";
import useAuthStore from "../store/auth-store";
import { Container } from "../components/layout";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCheckYourEmail, setShowCheckYourEmail] = useState(false);
  const { signup, isLoading, error, setError } = useAuthStore();

  useEffect(() => {
    // Clear error when component mounts or unmounts
    return () => {
      setError(null);
    };
  }, [setError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      setShowCheckYourEmail(true);
    } catch (error) {
      // The error is already set in the store, so we don't need to do anything here.
      // The UI will display the error message from the store.
      console.error("Signup failed:", error);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    const apiUrl = import.meta.env.VITE_BASE_API_URL;
    if (provider === "Google") {
      // Redirect to your backend's Google OAuth route
      window.location.href = `${apiUrl}/auth/login/google`;
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-4 sm:p-6 md:p-8">
          <Card className="bg-glass rounded-2xl">
            {showCheckYourEmail ? (
              <CardContent className="flex flex-col items-center justify-center p-10">
                <CardTitle className="text-2xl font-bold text-foreground mb-4">
                  Check Your Email
                </CardTitle>
                <p className="text-muted-foreground text-center mb-6">
                  We've sent a verification link to your email address. Please
                  check your inbox and follow the instructions to complete your
                  registration.
                </p>
                <p className="text-muted-foreground text-center text-sm">
                  Didn't receive an email? Check your spam folder or{" "}
                  <button
                    className="underline"
                    onClick={() => setShowCheckYourEmail(false)}
                  >
                    try signing up again
                  </button>
                  .
                </p>
              </CardContent>
            ) : (
              <>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-foreground">
                    Sign Up
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Create your Talent Pilot account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Full Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="talent@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                  <div className="grid gap-4 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          OR
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="glass"
                      className="w-full"
                      onClick={() => handleOAuthLogin("Google")}
                    >
                      <svg
                        className="w-6 h-6 mr-2"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 256S109.8 0 244 0c73.2 0 136.2 29.3 181.9 75.9L368.4 138.7C338.8 112.3 295.6 96 244 96c-88.6 0-160.2 71.5-160.2 160s71.6 160 160.2 160c92.9 0 140.5-62.3 145.9-93.8h-146v-69.8h243.1c1.3 12.2 2.2 24.2 2.2 36.8z"
                        ></path>
                      </svg>
                      Sign up with Google
                    </Button>
                    <div className="mt-4 text-center text-sm">
                      Already have an account?{" "}
                      <Link to="/login" className="underline">
                        Login
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </Container>
  );
};


export default SignUp;