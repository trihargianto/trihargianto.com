export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Tooling"
  | "Architecture"
  | "Leadership";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  experienceYears: number;
  level: "Expert" | "Advanced" | "Intermediate";
  summary: string;
  relatedIds?: string[];
};

export const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    experienceYears: 8,
    level: "Expert",
    summary: "Built design systems, SSR apps, and performance tooling.",
    relatedIds: ["typescript", "vite", "nextjs"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    experienceYears: 7,
    level: "Expert",
    summary: "Scaled large teams with strict typing and DX improvements.",
    relatedIds: ["react", "nodejs", "vitest"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    experienceYears: 5,
    level: "Advanced",
    summary: "Delivered SSR/ISR platforms with granular data caching.",
    relatedIds: ["react", "vercel", "typescript"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    experienceYears: 9,
    level: "Advanced",
    summary: "Shipped APIs and build tooling used by multi-team orgs.",
    relatedIds: ["express", "typescript", "aws"],
  },
  {
    id: "express",
    name: "Express",
    category: "Backend",
    experienceYears: 8,
    level: "Advanced",
    summary: "Built resilient REST APIs with observability baked in.",
    relatedIds: ["nodejs", "postgres", "aws"],
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Backend",
    experienceYears: 6,
    level: "Advanced",
    summary: "Designed schemas and tuning strategies for OLTP workloads.",
    relatedIds: ["nodejs", "aws"],
  },
  {
    id: "aws",
    name: "AWS",
    category: "Architecture",
    experienceYears: 7,
    level: "Advanced",
    summary: "Led migrations to serverless architectures and CI/CD stacks.",
    relatedIds: ["nodejs", "terraform", "cloudwatch"],
  },
  {
    id: "vite",
    name: "Vite",
    category: "Tooling",
    experienceYears: 3,
    level: "Advanced",
    summary: "Drove build-time reductions with plugin authoring experience.",
    relatedIds: ["react", "typescript"],
  },
  {
    id: "vitest",
    name: "Vitest",
    category: "Tooling",
    experienceYears: 2,
    level: "Intermediate",
    summary: "Unified unit testing strategy with parallelization and coverage.",
    relatedIds: ["vite", "typescript"],
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "Architecture",
    experienceYears: 4,
    level: "Intermediate",
    summary: "Codified infrastructure modules supporting dozens of services.",
    relatedIds: ["aws", "cloudwatch"],
  },
  {
    id: "cloudwatch",
    name: "CloudWatch",
    category: "Tooling",
    experienceYears: 5,
    level: "Advanced",
    summary: "Designed observability dashboards for SLO-driven teams.",
    relatedIds: ["aws", "terraform"],
  },
  {
    id: "leadership",
    name: "Engineering Leadership",
    category: "Leadership",
    experienceYears: 6,
    level: "Expert",
    summary: "Managed cross-functional squads delivering performance wins.",
    relatedIds: ["react", "aws", "typescript"],
  },
  {
    id: "design-systems",
    name: "Design Systems",
    category: "Frontend",
    experienceYears: 6,
    level: "Advanced",
    summary: "Built reusable component libraries with accessibility baked in.",
    relatedIds: ["react", "typescript"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Tooling",
    experienceYears: 3,
    level: "Advanced",
    summary: "Optimized edge deployment workflows and routing performance.",
    relatedIds: ["nextjs", "typescript"],
  },
];

