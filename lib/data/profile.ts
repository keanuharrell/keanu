export interface Profile {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  location?: string;
  bio: string;
  longBio?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
}

export const profile: Profile = {
  name: "Keanu Harrell",
  title: "Founding Engineer — Developer Experience & AI Tooling",
  email: "keanuharrell@icloud.com",
  phone: "+48 572 263 316",
  location: "France",
  bio: "Engineer with strong expertise in AI-assisted development workflows, serverless infrastructure, and cloud-native architectures.",
  longBio: `Engineer with strong expertise in AI-assisted development workflows, serverless infrastructure, and cloud-native architectures.

Passionate about reducing friction in the engineering lifecycle through internal tools, semantic automation, reproducible environments, and LLM-powered developer workflows.

Experience building full-stack systems end-to-end, from IaC to application code to observability.`,
  githubUrl: "https://github.com/keanuharrell",
  linkedinUrl: "https://linkedin.com/in/keanuharrell",
  websiteUrl: "https://keanuharrell.com",
};
