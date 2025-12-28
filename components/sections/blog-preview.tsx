"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { Container } from "@/components/layout";
import { PostListItem } from "@/components/post-list-item";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import type { Post } from "@/db/schemas";
import { cn } from "@/lib/utils";

interface BlogPreviewProps {
  posts: Post[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16">
      <Container>
        <SectionHeading>Writing</SectionHeading>
        {posts.length > 0 ? (
          <>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="divide-y divide-border"
            >
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                    },
                  }}
                >
                  <PostListItem post={post} />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8"
            >
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                View all posts
              </Link>
            </motion.div>
          </>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </Container>
    </section>
  );
}
