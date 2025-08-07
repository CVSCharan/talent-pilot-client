import { ThemeToggle } from "./ThemeToggle";
import { UserProfile } from "./UserProfile";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <img src="/logo.png" alt="TalentPilot Logo" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <UserProfile />
          </nav>
        </div>
      </div>
    </header>
  );
}
