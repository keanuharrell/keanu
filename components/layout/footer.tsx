"use client";

import {
  ArrowUp01Icon,
  Github01Icon,
  Linkedin01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { DevToIcon, MediumIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="mt-24 pb-8"
    >
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
          <motion.a
            href="https://github.com/keanuharrell"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <HugeiconsIcon icon={Github01Icon} className="size-5" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/keanuharrell"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <HugeiconsIcon icon={Linkedin01Icon} className="size-5" />
          </motion.a>
          <motion.a
            href="https://medium.com/@keanuharrell"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Medium"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MediumIcon />
          </motion.a>
          <motion.a
            href="https://dev.to/keanu-harrell"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Dev.to"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <DevToIcon />
          </motion.a>
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
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Keanu
        </p>

        <div className="hidden h-4 w-px bg-border/50 md:block" />

        {/* Back to Top */}
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <HugeiconsIcon icon={ArrowUp01Icon} className="size-4" />
          </Button>
        </motion.div>
      </div>
    </motion.footer>
  );
}
