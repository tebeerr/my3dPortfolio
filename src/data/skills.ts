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
      { name: "Angular", level: 80, color: "#dd0031" },
      { name: "TypeScript", level: 80, color: "#3178c6" },
      { name: "React", level: 60, color: "#61dafb" },
      { name: "Flutter", level: 60, color: "#02569b" },
      { name: "Tailwind CSS", level: 90, color: "#06b6d4" },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    hue: "#a78bfa",
    skills: [
      { name: "Python", level: 80, color: "#3776ab" },
      { name: "PHP / Symfony", level: 70, color: "#777bb4" },
      { name: "Java / Spring Boot", level: 67, color: "#ed8b00" },
      { name: "Node.js", level: 80, color: "#3c873a" },
      { name: "MySQL", level: 85, color: "#4479a1" },
      { name: "MongoDB", level: 60, color: "#4ea94b" },
    ],
  },
  {
    id: "security",
    label: "Cybersecurity",
    hue: "#ff6b6b",
    skills: [
      { name: "Wazuh SIEM", level: 80, color: "#3d5a80" },
      { name: "Active Directory", level: 80, color: "#0078d4" },
      { name: "Wireshark", level: 80, color: "#1679a7" },
      { name: "Nmap", level: 85, color: "#0e83cd" },
      { name: "Kali / Pentesting", level: 70, color: "#557c94" },
    ],
  },
  {
    id: "cloud",
    label: "DevOps & Cloud",
    hue: "#facc15",
    skills: [
      { name: "Docker", level: 76, color: "#2496ed" },
      { name: "GitLab CI/CD", level: 84, color: "#fc6d26" },
      { name: "Github Actions CI/CD", level: 84, color: "#fc6d26" },
      { name: "Ansible", level: 75, color: "#ee0000" },
      { name: "AWS", level: 80, color: "#ff9900" },
    ],
  },
];
