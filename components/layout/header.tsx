import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full py-4">
      <div className="mx-auto flex h-12 w-fit items-center gap-1 rounded-full border border-border/50 bg-background/80 px-2 shadow-black/5 shadow-sm ring-1 ring-white/5 ring-inset backdrop-blur-md">
        <Link
          href="/"
          className="rounded-full px-4 py-1.5 font-medium text-sm transition-colors hover:bg-muted hover:text-foreground"
        >
          Keanu
        </Link>
        <div className="h-4 w-px bg-border/50" />
        <nav className="flex gap-0.5">
          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "rounded-full",
            )}
          >
            About
          </Link>
          <Link
            href="/#projects"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "rounded-full",
            )}
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "rounded-full",
            )}
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
