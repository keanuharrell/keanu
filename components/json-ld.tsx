import { profile } from "@/lib/data";

interface WebSiteJsonLdProps {
  url: string;
}

export function WebSiteJsonLd({ url }: WebSiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile.name,
    url,
    description: profile.bio,
    author: {
      "@type": "Person",
      name: profile.name,
      url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface PersonJsonLdProps {
  url: string;
}

export function PersonJsonLd({ url }: PersonJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url,
    jobTitle: profile.title,
    description: profile.bio,
    email: profile.email ? `mailto:${profile.email}` : undefined,
    sameAs: [
      profile.githubUrl,
      profile.linkedinUrl,
      "https://medium.com/@keanuharrell",
      "https://dev.to/keanu-harrell",
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BlogPostingJsonLdProps {
  title: string;
  description?: string;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
  slug: string;
  url: string;
}

export function BlogPostingJsonLd({
  title,
  description,
  publishedAt,
  updatedAt,
  slug,
  url,
}: BlogPostingJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${url}/blog/${slug}`,
    datePublished: publishedAt?.toISOString(),
    dateModified: (updatedAt ?? publishedAt)?.toISOString(),
    author: {
      "@type": "Person",
      name: profile.name,
      url,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
      url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
