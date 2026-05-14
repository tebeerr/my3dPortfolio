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
    role: "Software developer intern",
    company: "LEPNEUMATIQUE",
    location: "Tunis, Tunisia",
    period: "2023",
    type: "education",
    description:
      "Led the Development of controllers for customer, product and orders.",
    stack: ["Angular", "Typescript", "Rest-API", "PHP", "Firebase","CI/CD"],
    achievements: [
      "Designed and implemented user-friendly interfaces to enhance usability and accessibility",
      "Development and optimization of REST APIs in PHP and Python Odoo, integrating SQL and NoSQL databases.",
      "Gained valuable experience in translating real-world needs into innovative digital solutions, refining web development and problem-solving skills."
    ],
  },
  {
    role: "Angular Frontend Developer",
    company: "KARMA SOLUTION",
    location: "Tunis, Tunisia",
    period: "2023 — 2025",
    type: "work",
    description:
      "Hybrid technical role bridging frontend engineering, backend APIs, infrastructure and security operations across client projects.",
    stack: ["Angular", "Typescript", "JavaScript", "Flutter", "Firebase", "Symfony","CI/CD"],
    achievements: [
      "Developing and maintaining web applications using Angular and other related technologies",
      "Build and sustain high-performance mobile applications utilizing Flutter and associated frameworks",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products",
      "Implementing responsive design and ensuring cross-browser compatibility",
      "Participating in code reviews and providing constructive feedback to other developers",
    ],
  },
  {
    role: "Engineering Degree — IT Systems Security & Networks",
    company: "TEK-UP University",
    location: "Tunis, Tunisia",
    period: "2024 - present",
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
