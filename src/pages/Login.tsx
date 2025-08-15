import { Link, useNavigate } from "react-router-dom";
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
import useAuthStore from "../store/auth-store";
import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, isAuthenticated, isLoading, error, setError } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to landing page after login
    }
    // Clear error when component mounts or unmounts
    return () => {
      setError(null);
    };
  }, [isAuthenticated, navigate, setError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleOAuthLogin = (provider: string) => {
    const apiUrl = import.meta.env.VITE_BASE_API_URL;
    if (provider === "Google") {
      // Redirect to your backend's Google OAuth route
      window.location.href = `${apiUrl}/auth/login/google`;
    }
  };

  return (
    <div className="flex items-center justify-center bg-background pt-12">
      <Card className="w-full max-w-md bg-card/60 backdrop-blur-sm rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            Login
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Continue to TalentPilot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="grid gap-4 mt-4">
            <Link
              to="/forgot-password"
              className="ml-auto mr-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
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
              Continue with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
