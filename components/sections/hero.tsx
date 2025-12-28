"use client";

import { Github01Icon, Linkedin01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";

import { Container } from "@/components/layout";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/keanuharrell",
    icon: Github01Icon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/keanuharrell",
    icon: Linkedin01Icon,
  },
];

export function Hero() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-medium text-4xl tracking-tight md:text-5xl"
        >
          Keanu Harrell
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
        >
          Software developer passionate about building beautiful and functional
          web experiences. I enjoy working with modern technologies and solving
          complex problems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-8 flex gap-4"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={link.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.3 + index * 0.1,
              }}
            >
              <HugeiconsIcon icon={link.icon} className="size-5" />
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
