"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("mb-8 font-medium text-2xl tracking-tight", className)}
    >
      {children}
    </motion.h2>
  );
}
