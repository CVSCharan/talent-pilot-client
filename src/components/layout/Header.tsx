import { Link } from "react-router-dom";
import useAuthStore from "../../store/auth-store";
import { ThemeToggle } from "./ThemeToggle";
import { UserProfile } from "./UserProfile";
import { cn } from "../lib/utils";

export function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="TalentPilot Logo"
              className="h-4 sm:h-6 w-auto"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav
            className={cn(
              "flex items-center",
              isAuthenticated ? "space-x-4" : "space-x-2"
            )}
          >
            {isAuthenticated && <UserProfile />}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
