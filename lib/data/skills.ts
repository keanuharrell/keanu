export interface Skill {
  id: number;
  name: string;
  category: "language" | "framework" | "cloud" | "devops" | "ai" | "tool";
  level: number; // 0-100
}

export const skills: Skill[] = [
  // Languages
  { id: 1, name: "TypeScript", category: "language", level: 95 },
  { id: 2, name: "Python", category: "language", level: 85 },
  { id: 3, name: "Go", category: "language", level: 70 },
  { id: 4, name: "C#", category: "language", level: 80 },
  { id: 5, name: "SQL", category: "language", level: 85 },

  // Frameworks
  { id: 6, name: "React", category: "framework", level: 95 },
  { id: 7, name: "Next.js", category: "framework", level: 95 },
  { id: 8, name: "Hono", category: "framework", level: 85 },
  { id: 9, name: ".NET", category: "framework", level: 80 },
  { id: 10, name: "Express", category: "framework", level: 85 },

  // Cloud & Infrastructure
  { id: 11, name: "AWS Lambda", category: "cloud", level: 90 },
  { id: 12, name: "EventBridge", category: "cloud", level: 85 },
  { id: 13, name: "DynamoDB", category: "cloud", level: 85 },
  { id: 14, name: "ECS/EKS", category: "cloud", level: 80 },
  { id: 15, name: "SQS/SNS", category: "cloud", level: 85 },

  // DevOps & CI/CD
  { id: 16, name: "GitHub Actions", category: "devops", level: 90 },
  { id: 17, name: "ArgoCD", category: "devops", level: 80 },
  { id: 18, name: "Terraform", category: "devops", level: 85 },
  { id: 19, name: "SST.dev", category: "devops", level: 90 },
  { id: 20, name: "Helm", category: "devops", level: 75 },

  // AI Tooling
  { id: 21, name: "OpenAI", category: "ai", level: 90 },
  { id: 22, name: "AWS Bedrock", category: "ai", level: 85 },
  { id: 23, name: "Vector Search", category: "ai", level: 80 },
  { id: 24, name: "Embeddings", category: "ai", level: 80 },

  // Observability & Tools
  { id: 25, name: "OpenTelemetry", category: "tool", level: 85 },
  { id: 26, name: "CloudWatch", category: "tool", level: 85 },
  { id: 27, name: "Grafana", category: "tool", level: 80 },
  { id: 28, name: "Prometheus", category: "tool", level: 75 },
];

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return skills.filter((skill) => skill.category === category);
}
