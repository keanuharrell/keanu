"use cache";

export async function Copyright() {
  return (
    <p className="text-muted-foreground text-sm">
      © {new Date().getFullYear()} Keanu
    </p>
  );
}
