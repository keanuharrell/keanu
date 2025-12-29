"use client";

import {
  Calendar01Icon,
  Mail01Icon,
  SentIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import { useState } from "react";

import { sendContactEmail } from "@/app/actions/contact";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  calendlyUrl?: string;
}

export function ContactForm({ calendlyUrl }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    const result = await sendContactEmail(data);

    setIsLoading(false);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error ?? "Something went wrong");
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center"
      >
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
          <HugeiconsIcon icon={SentIcon} className="size-8 text-green-500" />
        </div>
        <h3 className="mb-2 font-medium text-xl">Message sent!</h3>
        <p className="text-muted-foreground">
          Thanks for reaching out. I'll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell me about your project..."
            rows={5}
            required
            disabled={isLoading}
          />
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            "Sending..."
          ) : (
            <>
              <HugeiconsIcon icon={Mail01Icon} className="mr-2 size-4" />
              Send message
            </>
          )}
        </Button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col justify-center rounded-lg border border-border bg-card p-8"
      >
        <h3 className="mb-2 font-medium text-lg">Prefer a call?</h3>
        <p className="mb-6 text-muted-foreground text-sm">
          Book a 30-minute call to discuss your project or just say hi.
        </p>

        {calendlyUrl ? (
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            <HugeiconsIcon icon={Calendar01Icon} className="size-4" />
            Schedule a call
          </a>
        ) : (
          <Button variant="outline" disabled className="gap-2">
            <HugeiconsIcon icon={Calendar01Icon} className="size-4" />
            Coming soon
          </Button>
        )}

        <div className="mt-8 border-border border-t pt-8">
          <h4 className="mb-3 font-medium text-sm">Or reach out directly</h4>
          <a
            href="mailto:keanuharrell@icloud.com"
            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            keanuharrell@icloud.com
          </a>
        </div>
      </motion.div>
    </div>
  );
}
