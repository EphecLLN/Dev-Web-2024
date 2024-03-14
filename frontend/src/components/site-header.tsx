import { buttonVariants } from "./ui/button";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { CodeXml } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav
          items={[
            {
              title: "Home",
              to: "/",
            },
            {
              title: "About",
              to: "/about",
            },
            {
              title: "Users",
              to: "/users",
            },
          ]}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <a
              href="https://github.com/Bistouflere/Dev-Web-2024"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <CodeXml className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
