import {
  ArrowUp01Icon,
  Github01Icon,
  Linkedin01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Route } from "next";
import Link from "next/link";

import { DevToIcon, MediumIcon } from "@/components/icons";
import { FadeIn } from "@/components/motion";

import { Copyright } from "./footer-cache";
import { BackToTopButton, SocialLink } from "./footer-client";

const navLinks: { href: Route; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <FadeIn direction="up" className="mt-24 pb-8">
      <footer>
        <div className="mx-auto flex w-fit flex-col items-center gap-4 rounded-2xl border border-border/50 bg-background/80 px-6 py-5 shadow-black/5 shadow-sm ring-1 ring-white/5 ring-inset backdrop-blur-md md:flex-row md:gap-6">
          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden h-4 w-px bg-border/50 md:block" />

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <SocialLink
              href="https://github.com/keanuharrell"
              aria-label="GitHub"
            >
              <HugeiconsIcon icon={Github01Icon} className="size-5" />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/keanuharrell"
              aria-label="LinkedIn"
            >
              <HugeiconsIcon icon={Linkedin01Icon} className="size-5" />
            </SocialLink>
            <SocialLink
              href="https://medium.com/@keanuharrell"
              aria-label="Medium"
            >
              <MediumIcon />
            </SocialLink>
            <SocialLink href="https://dev.to/keanu-harrell" aria-label="Dev.to">
              <DevToIcon />
            </SocialLink>
          </div>

          <div className="hidden h-4 w-px bg-border/50 md:block" />

          {/* Email */}
          <a
            href="mailto:keanuharrell@icloud.com"
            className="flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            <HugeiconsIcon icon={Mail01Icon} className="size-4" />
            keanuharrell@icloud.com
          </a>

          <div className="hidden h-4 w-px bg-border/50 md:block" />

          {/* Copyright */}
          <Copyright />

          <div className="hidden h-4 w-px bg-border/50 md:block" />

          {/* Back to Top */}
          <BackToTopButton>
            <HugeiconsIcon icon={ArrowUp01Icon} className="size-4" />
          </BackToTopButton>
        </div>
      </footer>
    </FadeIn>
  );
}
