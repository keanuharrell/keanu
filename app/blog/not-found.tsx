import Link from "next/link";

import { Container } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="text-center">
        <h1 className="font-medium text-4xl tracking-tight">Post not found</h1>
        <p className="mt-4 text-muted-foreground">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: "outline" }), "mt-8")}
        >
          Back to blog
        </Link>
      </Container>
    </section>
  );
}
