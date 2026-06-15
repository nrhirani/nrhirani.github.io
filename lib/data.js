// Central content source for the portfolio.
// Edit this file to update copy without touching component code.

export const profile = {
  name: "Nishit Hirani",
  initials: "NH",
  title: "VP Engineering | AI Systems & Leadership",
  tagline: "AI SYSTEMS & ENGINEERING LEADERSHIP",
  heroDescription:
    "AI engineer focused on building intelligent systems from design to production. Specializing in LLM applications, system architecture, and advanced AI engineering. Leading high-performing engineering teams and translating complex AI challenges into scalable solutions. 11+ years driving innovation across AI systems, software engineering, and organizational leadership.",
};

export const navLinks = [
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Work" },
  { id: "articles", label: "Articles" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const expertise = [
  {
    index: "01",
    accent: "Engineering",
    title: "Leadership",
    icon: "Users",
    desc: "Building and scaling high-performing engineering teams. Cross-functional collaboration, strategic planning, organizational growth, and aligning technical initiatives with business goals. Leading product delivery and innovation across organizations.",
  },
  {
    index: "02",
    accent: "AI",
    title: "Engineering",
    icon: "BrainCircuit",
    desc: "End-to-end ownership of AI systems — from LLM architecture and context management to production deployment. Designing intelligent, scalable systems and orchestrating reliable AI delivery pipelines with Harness.",
  },
  {
    index: "03",
    accent: "Software",
    title: "Engineering",
    icon: "Code2",
    desc: "Full-stack development across modern tech stacks. Python, Node.js, React, Ruby on Rails, PHP. DevOps practices, CI/CD pipelines, cloud infrastructure, and scalable backend architecture. Building robust, production-grade systems.",
  },
];

export const quote = {
  text: "The best way to predict the future is to invent it.",
  author: "Alan Kay",
};

// Filter categories used by the Work section tabs
export const workFilters = ["All", "AI Systems", "Leadership", "Infrastructure"];

export const projects = [
  {
    title: "LLM-Powered Intelligent System",
    desc: "Architected and built a production AI platform leveraging LLMs for intelligent decision-making. Designed sophisticated system architecture, context management, and optimization techniques for real-world applications including vendor analysis and contract processing.",
    tech: ["Python", "LLMs", "AI Architecture", "System Design"],
    categories: ["AI Systems"],
    visual: "/projects/llm-system.svg",
    lottie: "https://assets-v2.lottiefiles.com/a/7b29eace-1187-11ee-974f-5bb800162a10/lRLVomoLDv.lottie",
  },
  {
    title: "Multi-SaaS Product Ecosystem & Team Leadership",
    desc: "Led engineering at KeepWorks for 9+ years, managing multiple SaaS products and global clients including Fortune 50 companies. Scaled teams, established engineering practices, and delivered high-availability solutions with focus on cost optimization. Experience spans full-stack development to AI-driven transformations.",
    tech: ["Team Leadership", "SaaS Products", "Enterprise Solutions", "Scalability"],
    categories: ["Leadership"],
    visual: "/projects/saas-ecosystem.svg",
    lottie: "https://assets-v2.lottiefiles.com/a/b3f68d46-118a-11ee-8e7e-57a82812c9dc/9AnkdDPI7M.lottie",
  },
  {
    title: "AI Engineering Framework & Implementation",
    desc: "Developed comprehensive AI engineering framework for designing, testing, and optimizing intelligent systems. Implemented advanced techniques for LLM applications, system optimization, and production-grade AI solutions with robust architecture patterns.",
    tech: ["Python", "AI Systems", "LLMs", "System Optimization"],
    categories: ["AI Systems"],
    visual: "/projects/ai-framework.svg",
    lottie: "https://assets-v2.lottiefiles.com/a/db9f4436-118b-11ee-bcb4-bb15fe6e80c3/sr3s6mEC2v.lottie",
  },
  {
    title: "Harness-Integrated AI Deployment Pipeline",
    desc: "Architected end-to-end deployment and orchestration for AI systems using Harness. Automated model serving, version management, and continuous deployment of intelligent applications with monitoring and rollback capabilities.",
    tech: ["Harness", "Python", "CI/CD", "AI Deployment"],
    categories: ["Infrastructure"],
    visual: "/projects/deployment-pipeline.svg",
    lottie: "https://assets-v2.lottiefiles.com/a/563dcf32-1187-11ee-9ffa-df8e9cdf9543/Kf53P5f4aa.lottie",
  },
];

export const articles = [
  {
    slug: "ai-engineering-production-grade-systems",
    title: "AI Engineering: Building Production-Grade Intelligent Systems",
    excerpt:
      "Comprehensive guide to AI engineering for production systems. Covering system architecture, LLM integration, optimization techniques, and best practices for building scalable, robust intelligent applications in real-world scenarios.",
    date: "Jun 2026",
    readTime: "15 min read",
  },
  {
    slug: "llm-architecture-system-design-production-ai",
    title: "LLM Architecture & System Design for Production AI",
    excerpt:
      "Deep dive into architecting AI systems with large language models. Learn design patterns, context management, system optimization, and techniques for building efficient, scalable AI applications with advanced capabilities.",
    date: "Jun 2026",
    readTime: "14 min read",
  },
  {
    slug: "deploying-ai-systems-with-harness",
    title: "Deploying AI Systems with Harness: A Complete Guide",
    excerpt:
      "End-to-end guide to deploying and managing AI applications using Harness. Covering model serving, continuous deployment, monitoring, rollback strategies, and best practices for production AI infrastructure.",
    date: "Jun 2026",
    readTime: "13 min read",
  },
];

export const experience = [
  {
    role: "Vice President of Engineering",
    company: "Alt",
    period: "Jun 2025 — Present",
    location: "Bengaluru, India",
    desc: "Leading engineering strategy and execution, building and scaling high-performing teams, and driving AI-first product development across the organization.",
    tech: ["Leadership", "AI Strategy", "Org Design"],
  },
  {
    role: "Associate Director - Engineering",
    company: "Aerchain",
    period: "May 2024 — May 2025",
    location: "Bengaluru, India",
    desc: "Drove engineering execution across procurement-tech products, partnering with cross-functional teams to ship high-impact features and scale platform reliability.",
    tech: ["Team Leadership", "Platform Scaling", "Process"],
  },
  {
    role: "Director of Engineering",
    company: "Intugine",
    period: "Apr 2023 — May 2024",
    location: "Bengaluru, India",
    desc: "Led engineering for logistics and supply-chain intelligence products, focused on system reliability, data pipelines, and team growth.",
    tech: ["Logistics Tech", "Data Pipelines", "Team Growth"],
  },
  {
    role: "Head of Engineering",
    company: "KeepWorks",
    period: "May 2021 — Apr 2023",
    location: "Bengaluru, India",
    desc: "Owned engineering for multiple SaaS products serving global clients including Fortune 50 companies, with a focus on availability, cost optimization, and AI-driven transformation.",
    tech: ["SaaS", "Enterprise Clients", "AI Transformation"],
  },
  {
    role: "Vice President of Engineering",
    company: "KeepWorks",
    period: "Sep 2016 — May 2021",
    location: "Bengaluru, India",
    desc: "Built and scaled the engineering organization from the ground up, establishing engineering practices and delivering high-availability solutions across a multi-product portfolio.",
    tech: ["Team Building", "Full-Stack", "Scalability"],
  },
];

export const social = [
  { label: "GitHub", href: "https://github.com/nrhirani", icon: "Github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/nrhirani", icon: "Linkedin" },
  { label: "Email", href: "mailto:nrhirani@gmail.com", icon: "Mail" },
];
