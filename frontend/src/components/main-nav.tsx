import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Network } from "lucide-react";

export function MainNav() {
  const router = useRouterState();

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
      </nav>
    </div>
  );
}
