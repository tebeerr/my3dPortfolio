"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Stars, Trail } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { skillGroups, type Skill } from "@/data/skills";

function SkillNode({
  position,
  skill,
  color,
  onHover,
}: {
  position: [number, number, number];
  skill: Skill;
  color: string;
  onHover: (s: Skill | null) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.08;
    ref.current.rotation.y += 0.01;
  });

  const size = 0.08 + (skill.level / 100) * 0.12;

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(skill);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        onHover(null);
        document.body.style.cursor = "auto";
      }}
      scale={hovered ? 1.4 : 1}
    >
      <icosahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.4 : 0.6}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
}

function OrbitGroup({
  groupIndex,
  hue,
  skills,
  onHover,
}: {
  groupIndex: number;
  hue: string;
  skills: Skill[];
  onHover: (s: Skill | null) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const radius = 1.6 + groupIndex * 0.9;
  const speed = 0.12 - groupIndex * 0.02;
  const tilt = (groupIndex * Math.PI) / 8;

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * speed;
  });

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      return [
        Math.cos(angle) * radius,
        Math.sin(angle * 0.7) * 0.3,
        Math.sin(angle) * radius,
      ] as [number, number, number];
    });
  }, [skills, radius]);

  return (
    <group ref={ref} rotation={[tilt, 0, tilt * 0.3]}>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.003, 16, 128]} />
        <meshBasicMaterial color={hue} transparent opacity={0.25} />
      </mesh>
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          position={positions[i]}
          skill={skill}
          color={skill.color}
          onHover={onHover}
        />
      ))}
    </group>
  );
}

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.rotation.x = state.clock.elapsedTime * 0.08;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial
        color="#64ffda"
        emissive="#64ffda"
        emissiveIntensity={1.2}
        wireframe
      />
    </mesh>
  );
}

function GalaxyScene({ onHover }: { onHover: (s: Skill | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#64ffda" distance={8} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#a78bfa" />

      <Core />

      {skillGroups.map((group, i) => (
        <OrbitGroup
          key={group.id}
          groupIndex={i}
          hue={group.hue}
          skills={group.skills}
          onHover={onHover}
        />
      ))}

      <Stars radius={30} depth={10} count={600} factor={1.5} fade speed={0.4} />
    </>
  );
}

export function SkillGalaxy() {
  const [hovered, setHovered] = useState<Skill | null>(null);

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-edge/60 bg-bg-deep/40">
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 55 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <GalaxyScene onHover={setHovered} />
        </Suspense>
      </Canvas>

      {/* Hover readout */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 max-w-xs">
        {hovered ? (
          <div className="glass rounded-lg px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
              {hovered.name}
            </p>
            <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${hovered.level}%` }}
              />
            </div>
            <p className="mt-1 font-mono text-[10px] text-ink-muted">
              proficiency · {hovered.level}%
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-edge/40 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              hover · skill nodes
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-wrap gap-2">
        {skillGroups.map((g) => (
          <div
            key={g.id}
            className="flex items-center gap-1.5 rounded-full border border-edge/40 bg-bg-deep/60 px-2.5 py-1 backdrop-blur"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: g.hue, boxShadow: `0 0 8px ${g.hue}` }}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              {g.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
