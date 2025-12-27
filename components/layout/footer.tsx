import {
  Github01Icon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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

export function Footer() {
  return (
    <footer className="mt-24 pb-8">
      <div className="mx-auto flex w-fit flex-col items-center gap-3 rounded-full border border-border/50 bg-background/80 px-6 py-4 shadow-black/5 shadow-sm ring-1 ring-white/5 ring-inset backdrop-blur-md">
        <div className="flex items-center gap-4">
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
          <div className="h-4 w-px bg-border/50" />
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Keanu
          </p>
        </div>
      </div>
    </footer>
  );
}
