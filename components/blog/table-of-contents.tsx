"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback } from "react";

import type { TocItem } from "@/lib/blog";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (!element) return;

      const offset = 100; // Account for sticky header
      const top = element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      // Update URL without scrolling
      window.history.pushState(null, "", `#${id}`);
    },
    [prefersReducedMotion],
  );

  if (items.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="hidden xl:block"
      aria-label="Table of contents"
    >
      <div className="sticky top-24">
        <h2 className="mb-4 font-medium text-sm">On this page</h2>
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "block text-muted-foreground transition-colors hover:text-foreground",
                  item.level === 3 && "pl-4",
                  item.level === 4 && "pl-8",
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
