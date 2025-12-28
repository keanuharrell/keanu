"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "slide-left" | "slide-right" | "scale";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const animationClasses = {
  "fade-in": "animate-in fade-in",
  "slide-up": "animate-in fade-in slide-in-from-bottom-4",
  "slide-left": "animate-in fade-in slide-in-from-right-4",
  "slide-right": "animate-in fade-in slide-in-from-left-4",
  scale: "animate-in fade-in zoom-in-95",
};

export function AnimateOnScroll({
  children,
  className,
  animation = "fade-in",
  delay = 0,
  duration = 500,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? animationClasses[animation] : "opacity-0",
        className,
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
