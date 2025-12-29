import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/layout";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Contact | Keanu Harrell",
  description:
    "Get in touch with me for collaborations, projects, or just to say hi.",
};

export default function ContactPage() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading>Get in touch</SectionHeading>
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
          Have a project in mind or just want to chat? Send me a message or book
          a call.
        </p>
        <ContactForm calendlyUrl="https://calendly.com/keanuharrell/30min" />
      </Container>
    </section>
  );
}
