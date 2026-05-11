export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  type: "work" | "education" | "project";
  description: string;
  stack: string[];
  achievements: string[];
};

export const experiences: Experience[] = [
  {
    role: "Angular / PHP Developer & SysAdmin",
    company: "KARMA SOLUTION",
    location: "Tunis, Tunisia",
    period: "2024 — Present",
    type: "work",
    description:
      "Hybrid technical role bridging frontend engineering, backend APIs, infrastructure and security operations across client projects.",
    stack: ["Angular", "PHP", "Symfony", "Docker", "Linux", "CI/CD"],
    achievements: [
      "Built and maintained Angular applications with PHP/Symfony backends",
      "Administered Linux servers, Docker containers and CI/CD pipelines",
      "Implemented monitoring and hardening across production systems",
    ],
  },
  {
    role: "Backend Developer (Spring Boot Microservices)",
    company: "Latitude Sport — uticket platform",
    location: "Remote",
    period: "2024",
    type: "work",
    description:
      "Worked on GitLab CI/CD optimization for 23+ Java Spring Boot microservices deployed to Azure Container Registry, plus PDF generation and KoolReport dashboards on the uticket PHP platform.",
    stack: ["Java", "Spring Boot", "PHP", "Azure", "GitLab CI", "Docker"],
    achievements: [
      "Resolved cascading CI/CD failures (artifact size, runner disk, DinD)",
      "Designed local runner cache strategy with push/pull policies",
      "Built Belgian fiscal-attestation PDF generation (281.86 form, FPDI)",
    ],
  },
  {
    role: "Engineering Degree — IT Systems Security & Networks",
    company: "TEK-UP University",
    location: "Tunis, Tunisia",
    period: "2021 — 2026",
    type: "education",
    description:
      "Final-year engineering student in the ING-SSIR program — IT Systems Security & Networks. Curriculum covers cryptography, network architecture, ethical hacking and secure software design.",
    stack: ["Cybersecurity", "Networks", "Cryptography", "SOC Operations"],
    achievements: [
      "Capstone: AI-powered SOC on Wazuh with ML threat detection",
      "Hands-on labs in GNS3, Active Directory, MPLS VPN",
      "Coursework in penetration testing and secure development",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Upwork & Direct Clients",
    location: "Remote",
    period: "2023 — Present",
    type: "work",
    description:
      "Independent engagements building web and mobile applications — primarily Angular/PHP stacks, with occasional React Native and Python automation work.",
    stack: ["Angular", "React", "Python", "Flutter", "PHP", "MySQL"],
    achievements: [
      "Mobile car-insurance React app with claims and canvas drawing",
      "Automated job-application pipeline (Python + Gmail SMTP)",
      "RAGfy chatbot using LangChain/LLaMA/Groq",
    ],
  },
];
