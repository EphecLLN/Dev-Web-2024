import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import { Link } from "@tanstack/react-router";
import { Network } from "lucide-react";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="flex items-center space-x-2">
        <Network className="h-6 w-6" />
        <span className="inline-block font-bold">MadBrackets</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.to && (
                <Link
                  key={index}
                  to={item.to}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      ) : null}
    </div>
  );
}
