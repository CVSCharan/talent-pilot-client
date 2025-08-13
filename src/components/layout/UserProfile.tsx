import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useAuthStore from "../../store/auth-store";
import { useUserProfileStore } from "../../hooks/use-user-profile";
import { useNavigate } from "react-router-dom"; // Added import

export function UserProfile() {
  const logout = useAuthStore((state) => state.logout);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const isHydrated = useUserProfileStore((state) => state.isHydrated);
  const navigate = useNavigate();

  if (!isHydrated || !userProfile) {
    // Or a loading spinner, or null
    return null;
  }

  const handleLogout = async () => { // New async handler
    await logout(); // Await the logout function
    navigate("/login"); // Navigate after logout
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center gap-2 transition-colors duration-300 hover:bg-muted/50"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={userProfile.photoURL ?? "/avatars/01.png"}
              alt={userProfile.displayName ?? "User"}
            />
            <AvatarFallback>
              {userProfile.displayName?.[0].toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-primary">
            {userProfile.displayName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={userProfile.photoURL ?? "/avatars/01.png"}
                alt={userProfile.displayName ?? "User"}
              />
              <AvatarFallback>
                {userProfile.displayName?.[0].toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-md font-semibold leading-none">
                {userProfile.displayName}
              </p>
              <p className="text-sm text-muted-foreground">
                {userProfile.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem> {/* Changed onClick */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}