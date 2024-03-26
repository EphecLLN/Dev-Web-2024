import { cn } from "@/lib/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Network } from "lucide-react";

export function MainNav() {
  const router = useRouterState();
  const { isAuthenticated } = useAuth0();

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Network className="h-6 w-6" />
        <span className="hidden text-base font-bold sm:inline-block">
          MadBrackets
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-base">
        <Link
          to="/about"
          className={cn(
            "transition-colors hover:text-foreground/80",
            router.location.pathname?.startsWith("/about")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          About
        </Link>
        <Link
          to="/users"
          className={cn(
            "transition-colors hover:text-foreground/80",
            router.location.pathname?.startsWith("/users")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Users
        </Link>
        <Link
          to="/tournaments"
          className={cn(
            "transition-colors hover:text-foreground/80",
            router.location.pathname?.startsWith("/tournaments")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Tournaments
        </Link>
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className={cn(
              "transition-colors hover:text-foreground/80",
              router.location.pathname?.startsWith("/dashboard")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Dashboard
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
