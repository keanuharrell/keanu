"use client";

import { Mail01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks: { href: Route; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="sticky top-0 z-50 w-full py-4"
    >
      <div className="mx-auto flex h-12 w-fit items-center gap-1 rounded-full border border-border/50 bg-background/80 px-2 shadow-black/5 shadow-sm ring-1 ring-white/5 ring-inset backdrop-blur-md">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "rounded-full px-4 py-1.5 font-medium text-sm transition-colors hover:bg-muted hover:text-foreground",
            pathname === "/" && "bg-muted text-foreground",
          )}
        >
          Keanu
        </Link>

        <div className="h-4 w-px bg-border/50" />

        {/* Desktop Navigation */}
        <nav className="hidden gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-full",
                isActive(link.href) && "bg-muted text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden h-4 w-px bg-border/50 md:block" />

        {/* Desktop Actions */}
        <div className="hidden items-center gap-0.5 md:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "gap-1.5 rounded-full",
              isActive("/contact") && "bg-primary/90",
            )}
          >
            <HugeiconsIcon icon={Mail01Icon} className="size-4" />
            Contact
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-0.5 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full"
                />
              }
            >
              <HugeiconsIcon icon={Menu01Icon} className="size-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-muted",
                      isActive(link.href) && "bg-muted font-medium",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-2 h-px bg-border" />
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "justify-start gap-2",
                  )}
                >
                  <HugeiconsIcon icon={Mail01Icon} className="size-4" />
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
