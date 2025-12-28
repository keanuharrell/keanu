"use client";

import { Home01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import Link from "next/link";

import { Container } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const funMessages = [
  "Looks like this page went on vacation without telling anyone.",
  "This page is playing hide and seek. It's winning.",
  "Houston, we have a problem. This page doesn't exist.",
  "This page got mass-assigned to /dev/null.",
  "git checkout main -- this-page (file not found)",
];

export function NotFoundContent() {
  const randomMessage =
    funMessages[Math.floor(Math.random() * funMessages.length)];

  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <Container className="text-center">
        {/* Floating ghost animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.5 },
            y: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="mb-8 text-8xl"
        >
          👻
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="font-bold font-mono text-8xl text-muted-foreground/30 leading-none md:text-[10rem]">
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="-mt-6 font-medium text-2xl tracking-tight md:-mt-8 md:text-3xl"
        >
          Oops! Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mt-4 max-w-md text-muted-foreground"
        >
          {randomMessage}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
            <HugeiconsIcon icon={Home01Icon} data-icon="inline-start" />
            Take me home
          </Link>
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <HugeiconsIcon icon={Search01Icon} data-icon="inline-start" />
            Browse blog
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
