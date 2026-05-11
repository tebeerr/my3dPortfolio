import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { About } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

export default function Page() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <ExperienceSection />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
