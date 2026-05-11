export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  stack: string[];
  category: "AI/ML" | "Security" | "Web3" | "Full-Stack" | "DevOps";
  highlights: string[];
  github?: string;
  demo?: string;
  year: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "ragfy",
    title: "RAGfy",
    tagline: "LLM chatbot with retrieval-augmented generation",
    description:
      "A Python chatbot powered by LLaMA, LangChain and Groq with a full RAG architecture. Query your own documents in natural language.",
    longDescription:
      "RAGfy combines a Groq-accelerated LLaMA backend with LangChain orchestration to build a context-aware document chatbot. Documents are chunked, embedded and indexed locally, then retrieved at query time to ground every response in source material. Streamlit front-end with persistent chat history.",
    stack: ["Python", "LangChain", "LLaMA", "Groq", "Streamlit", "FAISS"],
    category: "AI/ML",
    highlights: [
      "Sub-second retrieval over user document corpus",
      "Streaming responses via Groq inference",
      "Pluggable embedding + vector store layer",
    ],
    github: "https://github.com/tebeerr/RAGfy",
    year: "2025",
    featured: true,
  },
  {
    slug: "facelock",
    title: "FaceLock",
    tagline: "Biometric face-recognition access control",
    description:
      "Python facial-recognition security system for access control using computer vision and feature-vector matching.",
    longDescription:
      "FaceLock builds a face-recognition pipeline on top of OpenCV and dlib. Faces are detected, aligned and encoded into 128-dim feature vectors, then compared against an authorized roster. Designed as a drop-in auth layer for physical access or kiosk login.",
    stack: ["Python", "OpenCV", "dlib", "NumPy", "Machine Learning"],
    category: "Security",
    highlights: [
      "Real-time face detection + alignment",
      "Encoder-distance authorization logic",
      "Local-first — no cloud dependency",
    ],
    github: "https://github.com/tebeerr/FaceLock",
    year: "2024",
    featured: true,
  },
  {
    slug: "ai-soc",
    title: "AI-Powered SOC",
    tagline: "Wazuh + ML threat detection",
    description:
      "Security Operations Center built on Wazuh, augmented with ML modules for anomaly detection and intelligent alert triage.",
    longDescription:
      "Academic capstone fusing a Wazuh SIEM deployment with custom machine-learning detectors. Wazuh agents stream telemetry into Elastic, while a Python pipeline scores events for anomalous patterns and enriches alerts before they hit the analyst dashboard.",
    stack: ["Wazuh", "Python", "Elastic", "Docker", "Linux", "ML"],
    category: "Security",
    highlights: [
      "Wazuh agents + Elastic stack pipeline",
      "ML scoring layer for alert triage",
      "Hardened CentOS sensor nodes",
    ],
    year: "2025",
    featured: true,
  },
  {
    slug: "safeclub",
    title: "SafeClub",
    tagline: "Decentralized club management on Ethereum",
    description:
      "Web3 smart-contract platform for club management built with Solidity, deployed on Ethereum testnet.",
    longDescription:
      "SafeClub uses Solidity smart contracts to manage member onboarding, dues and governance for clubs without a central administrator. A JavaScript front-end signs transactions via Web3.js, giving members verifiable ownership of their stake.",
    stack: ["Solidity", "JavaScript", "Web3.js", "Ethereum"],
    category: "Web3",
    highlights: [
      "On-chain member registry",
      "Governance via signed transactions",
      "Hardhat test suite",
    ],
    github: "https://github.com/tebeerr/safeClub--Solidity-",
    year: "2024",
    featured: false,
  },
  {
    slug: "gns3-mpls-vpn",
    title: "GNS3 MPLS VPN Lab",
    tagline: "IP/MPLS VPN topology with OSPF + MP-BGP VPNv4",
    description:
      "Service-provider grade MPLS VPN simulation in GNS3 — OSPF in the core, MP-BGP VPNv4 between PE routers, isolated customer VRFs.",
    longDescription:
      "A multi-router GNS3 lab modeling a carrier backbone. PE routers run MP-BGP VPNv4 to exchange customer routes, LDP distributes labels, OSPF carries the IGP, and each customer site lives inside its own VRF. Lab includes failure injection and convergence measurement.",
    stack: ["GNS3", "MPLS", "MP-BGP", "OSPF", "Cisco IOS"],
    category: "Security",
    highlights: [
      "MP-BGP VPNv4 between PE routers",
      "Per-customer VRF isolation",
      "Sub-second OSPF convergence",
    ],
    year: "2024",
    featured: true,
  },
  {
    slug: "ad-hardening",
    title: "Active Directory Hardening",
    tagline: "CentOS + Ansible automation for AD security policies",
    description:
      "Automated baseline-hardening playbooks for Windows AD environments, paired with CentOS jump-host configuration.",
    longDescription:
      "A set of Ansible playbooks that apply CIS-aligned hardening to Active Directory: GPO baselines, audit policies, privileged group cleanup, LAPS rollout, and Kerberos hardening. CentOS jump-hosts are configured identically across the fleet.",
    stack: ["Ansible", "Active Directory", "Windows Server", "CentOS", "PowerShell"],
    category: "DevOps",
    highlights: [
      "Idempotent CIS-aligned playbooks",
      "Centralized audit policy",
      "LAPS + Kerberos hardening",
    ],
    year: "2024",
    featured: false,
  },
  {
    slug: "gestion-cours",
    title: "Système de Gestion des Cours",
    tagline: "Student course management platform",
    description:
      "Full-stack academic platform for managing student courses, grades, scheduling and admin workflows.",
    longDescription:
      "PHP/MySQL platform serving students, instructors and administrators. Role-based dashboards, grade publishing, schedule generation, and import/export pipelines. Built as a teaching tool for university-scale rollout.",
    stack: ["PHP", "MySQL", "HTML5", "Bootstrap"],
    category: "Full-Stack",
    highlights: [
      "Role-based access control",
      "Schedule conflict detection",
      "CSV/Excel import-export",
    ],
    github: "https://github.com/tebeerr/Systeme-de-Gestion-des-Cours-etudiants",
    year: "2023",
    featured: false,
  },
];
