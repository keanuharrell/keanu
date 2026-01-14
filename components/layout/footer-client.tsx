"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

interface SocialLinkProps {
  href: string;
  "aria-label": string;
  children: React.ReactNode;
}

export function SocialLink({
  href,
  "aria-label": ariaLabel,
  children,
}: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground transition-colors hover:text-foreground"
      aria-label={ariaLabel}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

interface BackToTopButtonProps {
  children: React.ReactNode;
}

export function BackToTopButton({ children }: BackToTopButtonProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        {children}
      </Button>
    </motion.div>
  );
}
