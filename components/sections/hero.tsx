import {
  Github01Icon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Container } from "@/components/layout";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/keanuharrell",
    icon: Github01Icon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/keanuharrell",
    icon: NewTwitterIcon,
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
        <h1 className="font-medium text-4xl tracking-tight md:text-5xl">
          Keanu Harrell
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Software developer passionate about building beautiful and functional
          web experiences. I enjoy working with modern technologies and solving
          complex problems.
        </p>
        <div className="mt-8 flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={link.name}
            >
              <HugeiconsIcon icon={link.icon} className="size-5" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
