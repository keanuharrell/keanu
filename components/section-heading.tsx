import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2 className={cn("mb-8 font-medium text-2xl tracking-tight", className)}>
      {children}
    </h2>
  );
}
