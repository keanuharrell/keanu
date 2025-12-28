export interface Experience {
  id: number;
  type: "work" | "education" | "project";
  title: string;
  company?: string;
  location?: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  skills?: string[];
  url?: string;
}

export const experiences: Experience[] = [
  // Work Experience
  {
    id: 1,
    type: "work",
    title: "Founding Engineer / CTO",
    company: "Untitled (Early-Stage SaaS)",
    location: "France",
    description:
      "Owned Developer Experience across the entire engineering lifecycle. Architected a multi-tenant serverless platform using SST v3, EventBridge, Lambda, Neon, and DynamoDB. Implemented AI-driven workflows using OpenAI/Bedrock for schema introspection, safe migrations, and code generation.",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2025-09-01"),
    isCurrent: false,
    skills: ["SST", "AWS", "TypeScript", "OpenAI", "DynamoDB", "Neon"],
  },
  {
    id: 2,
    type: "work",
    title: "Full-Stack & Platform Engineer",
    company: "Orisha Healthcare France",
    location: "Villers-lès-Nancy, France",
    description:
      "Developed and maintained healthcare enterprise solutions using .NET/C#, VB, and React. Maintained platform services deployed on AWS EKS (15+ services). Designed GitOps workflows using ArgoCD, Terraform, and CI automation.",
    startDate: new Date("2022-08-01"),
    endDate: new Date("2025-09-01"),
    isCurrent: false,
    skills: [".NET", "C#", "React", "AWS EKS", "ArgoCD", "Terraform"],
  },
  {
    id: 3,
    type: "work",
    title: "Automation Engineer",
    company: "University of Warsaw",
    location: "Poland",
    description:
      "Automated research and validation workflows using Python, reducing manual effort and improving reproducibility. Built internal scripting tools for validation and data integrity checks.",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-10-01"),
    isCurrent: false,
    skills: ["Python", "Automation", "Data Validation"],
  },

  // Education
  {
    id: 4,
    type: "education",
    title: "Master of Computer Science — Cloud & Data Engineering",
    company: "CESI Engineering School",
    location: "Villers-lès-Nancy, France",
    startDate: new Date("2022-09-01"),
    endDate: new Date("2025-06-01"),
    isCurrent: false,
  },
  {
    id: 5,
    type: "education",
    title: "Associate Degree in Computer Science (DUT)",
    company: "Nancy-Charlemagne Institute of Technology",
    location: "Nancy, France",
    startDate: new Date("2020-09-01"),
    endDate: new Date("2022-06-01"),
    isCurrent: false,
  },
];

export function getExperiencesByType(type: Experience["type"]): Experience[] {
  return experiences
    .filter((exp) => exp.type === type)
    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
}
