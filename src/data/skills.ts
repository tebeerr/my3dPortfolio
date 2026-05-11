export type Skill = {
  name: string;
  level: number; // 0-100
  color: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  hue: string; // accent color for this orbit
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend / Mobile",
    hue: "#64ffda",
    skills: [
      { name: "Angular", level: 92, color: "#dd0031" },
      { name: "TypeScript", level: 88, color: "#3178c6" },
      { name: "React", level: 80, color: "#61dafb" },
      { name: "Flutter", level: 70, color: "#02569b" },
      { name: "Tailwind CSS", level: 86, color: "#06b6d4" },
      { name: "Dart", level: 68, color: "#0175c2" },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    hue: "#a78bfa",
    skills: [
      { name: "Python", level: 88, color: "#3776ab" },
      { name: "PHP / Symfony", level: 90, color: "#777bb4" },
      { name: "Java / Spring Boot", level: 78, color: "#ed8b00" },
      { name: "Node.js", level: 70, color: "#3c873a" },
      { name: "MySQL", level: 85, color: "#4479a1" },
      { name: "MongoDB", level: 72, color: "#4ea94b" },
    ],
  },
  {
    id: "security",
    label: "Cybersecurity",
    hue: "#ff6b6b",
    skills: [
      { name: "Wazuh SIEM", level: 82, color: "#3d5a80" },
      { name: "Active Directory", level: 78, color: "#0078d4" },
      { name: "Wireshark", level: 80, color: "#1679a7" },
      { name: "Nmap", level: 85, color: "#0e83cd" },
      { name: "Kali / Pentesting", level: 75, color: "#557c94" },
      { name: "GNS3 / MPLS", level: 80, color: "#22c55e" },
    ],
  },
  {
    id: "cloud",
    label: "DevOps & Cloud",
    hue: "#facc15",
    skills: [
      { name: "Docker", level: 86, color: "#2496ed" },
      { name: "Kubernetes", level: 70, color: "#326ce5" },
      { name: "GitLab CI/CD", level: 84, color: "#fc6d26" },
      { name: "Ansible", level: 75, color: "#ee0000" },
      { name: "AWS", level: 65, color: "#ff9900" },
      { name: "Azure", level: 72, color: "#0078d4" },
    ],
  },
];
