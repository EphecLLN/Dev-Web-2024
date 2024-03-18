import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link, useRouterState } from "@tanstack/react-router";
import { MenuIcon, Network } from "lucide-react";
import { useState } from "react";

export function MobileNav() {
  const router = useRouterState();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <MenuIcon />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Network className="mr-2 h-4 w-4" />
          <span className="font-bold">MadBrackets</span>
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link
              to="/about"
              className={cn(
                "transition-colors hover:text-foreground/80",
                router.location.pathname?.startsWith("/about")
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
              onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
