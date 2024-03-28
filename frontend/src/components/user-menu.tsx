import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "@tanstack/react-router";
import { LogIn, LogOut } from "lucide-react";

export function UserMenu() {
  const { isAuthenticated, logout, loginWithPopup, user } = useAuth0();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {isAuthenticated ? (
            <img
              src={user?.picture}
              alt="User profile"
              className="h-[1.5rem] w-[1.5rem] rounded-full"
            />
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              <span className="sr-only">Login</span>
            </>
          )}
          <span className="sr-only">User Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            navigate({
              to: "/profile",
            });
          }}
        >
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigate({
              to: "/settings",
            });
          }}
        >
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigate({
              to: "/dashboard",
            });
          }}
        >
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            if (isAuthenticated) {
              await logout({
                logoutParams: { returnTo: window.location.origin },
              });
            } else {
              await loginWithPopup();
            }
          }}
        >
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span>Logout</span> <LogOut className="h-5 w-5" />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Login</span> <LogOut />
            </div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
