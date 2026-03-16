export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  copyCount: number;
  createdAt: string;
}

export const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "SaaS Landing Page Copywriter",
    description: "Generates high-converting landing page copy based on your product features and target audience.",
    content: "Act as an expert copywriter specializing in SaaS. Write a high-converting landing page for a [Product Name] that targets [Target Audience]. Include a hero section with a compelling H1, 3 key benefits, a social proof section, and a strong CTA.",
    category: "Marketing",
    tags: ["saas", "copywriting", "landing-page"],
    copyCount: 1245,
    createdAt: "2024-03-01T10:00:00Z"
  },
  {
    id: "2",
    title: "React Component Generator",
    description: "Creates production-ready React components with TypeScript and Tailwind CSS.",
    content: "Build a React component for a [Component Description] using TypeScript and Tailwind CSS. Ensure it handles accessibility (ARIA attributes), edge cases, and includes well-documented props.",
    category: "Coding",
    tags: ["react", "typescript", "tailwind"],
    copyCount: 980,
    createdAt: "2024-03-02T12:00:00Z"
  },
  {
    id: "3",
    title: "SEO Blog Outline",
    description: "Generates a structured outline for an SEO-optimized blog post.",
    content: "Create a detailed outline for a blog post targeting the keyword '[Target Keyword]'. Include H2 and H3 headings, suggest LSI keywords, and recommend a meta description.",
    category: "SEO",
    tags: ["blogging", "content", "seo"],
    copyCount: 2341,
    createdAt: "2024-03-03T09:30:00Z"
  },
  {
    id: "4",
    title: "Twitter Thread Creator",
    description: "Turns a single idea into a viral Twitter thread.",
    content: "Turn the following concept into a 5-tweet thread: '[Your Idea]'. Start with a strong hook, use formatting for readability, include actionable advice, and end with a call to action.",
    category: "Social Media",
    tags: ["twitter", "viral", "growth"],
    copyCount: 1560,
    createdAt: "2024-03-04T15:00:00Z"
  },
  {
    id: "5",
    title: "JavaScript Bug Fixer",
    description: "Analyzes and fixes JavaScript code snippets.",
    content: "Analyze the following JavaScript code for any bugs, performance issues, or bad practices. Provide the corrected code along with an explanation of what was fixed: \n\n[Insert Code Here]",
    category: "Coding",
    tags: ["debugging", "javascript", "clean-code"],
    copyCount: 890,
    createdAt: "2024-03-05T08:15:00Z"
  },
  {
    id: "6",
    title: "Cold Email Outreach",
    description: "Drafts personalized B2B cold emails.",
    content: "Write a short, professional, and personalized cold email to [Prospect Name/Role] at [Company Name]. The goal is to introduce [Your Service] without being overly salesy, and asking for a brief introductory call.",
    category: "Business",
    tags: ["sales", "email", "b2b"],
    copyCount: 3102,
    createdAt: "2024-03-06T11:45:00Z"
  }
];

export const categories = [
  "Marketing",
  "Coding",
  "SEO",
  "Social Media",
  "Productivity",
  "Business",
  "Writing",
  "Design",
];
