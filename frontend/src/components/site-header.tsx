import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "./ui/button";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import { Fingerprint, LogIn, LogOut } from "lucide-react";

export function SiteHeader() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <a
              href="https://github.com/Bistouflere/Dev-Web-2024"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <GitHubLogoIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </a>
            <ThemeToggle />
            {isAuthenticated ? (
              <Link
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "w-9 px-0",
                  )}
                >
                  <LogOut />
                  <span className="sr-only">Logout</span>
                </div>
              </Link>
            ) : (
              <Link onClick={() => loginWithRedirect()}>
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "w-9 px-0",
                  )}
                >
                  <Fingerprint />
                  <span className="sr-only">Login</span>
                </div>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
