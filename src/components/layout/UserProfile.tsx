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
          className="relative flex items-center gap-2 transition-all duration-300 hover:bg-muted/50 focus:ring-2 focus:ring-primary/20 focus:ring-offset-1"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={userProfile.photoUrl ?? "/avatars/01.png"}
              alt={userProfile.displayName ?? "User"}
            />
            <AvatarFallback>
              {userProfile.displayName?.[0].toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-primary truncate">
            {userProfile.displayName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end" forceMount sideOffset={8}>
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={userProfile.photoUrl ?? "/avatars/01.png"}
                alt={userProfile.displayName ?? "User"}
              />
              <AvatarFallback>
                {userProfile.displayName?.[0].toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <p className="text-md font-semibold leading-none truncate">
                {userProfile.displayName}
              </p>
              <p className="text-sm text-muted-foreground truncate mt-1">
                {userProfile.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="cursor-pointer p-2 focus:bg-muted/50 focus:text-foreground"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Log out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}