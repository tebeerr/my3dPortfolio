"use client";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  Float,
  Sphere,
  Points,
  PointMaterial,
  Stars,
  Sparkles,
  shaderMaterial,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

// Custom shader: fresnel rim glow + animated scanlines for the holographic feel
const AvatarShaderMat = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#64ffda"),
    uFresnelPower: 2.5,
  },
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vPos = mv.xyz;
      gl_Position = projectionMatrix * mv;
    }
  `,
  /* glsl */ `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uFresnelPower;
    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec2 vUv;

    void main() {
      vec3 viewDir = normalize(-vPos);
      float fres = pow(1.0 - max(dot(viewDir, vNormal), 0.0), uFresnelPower);
      float lines = sin((vUv.y + uTime * 0.15) * 80.0) * 0.5 + 0.5;
      lines = smoothstep(0.4, 1.0, lines) * 0.18;
      float pulse = sin(uTime * 1.4) * 0.5 + 0.5;
      vec3 col = uColor * (fres * 1.6 + lines + 0.08);
      col += uColor * pulse * 0.08;
      float alpha = fres * 0.95 + lines * 0.3 + 0.04;
      gl_FragColor = vec4(col, alpha);
    }
  `
);

extend({ AvatarShaderMat });

declare module "@react-three/fiber" {
  interface ThreeElements {
    avatarShaderMat: {
      ref?: React.Ref<THREE.ShaderMaterial>;
      attach?: string;
      transparent?: boolean;
      depthWrite?: boolean;
      side?: THREE.Side;
    };
  }
}

function HoloAvatar() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (matRef.current?.uniforms?.uTime) {
      (matRef.current.uniforms.uTime as { value: number }).value =
        state.clock.elapsedTime;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#64ffda" wireframe transparent opacity={0.22} />
      </mesh>
      <Sphere args={[1.45, 64, 64]}>
        <avatarShaderMat
          ref={matRef}
          attach="material"
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </Sphere>
      <Sphere args={[0.9, 32, 32]}>
        <meshBasicMaterial color="#0a1a26" />
      </Sphere>
      <pointLight color="#64ffda" intensity={2} distance={6} />
    </group>
  );
}

function OrbitingRing({
  radius,
  speed,
  axis,
  color = "#64ffda",
}: {
  radius: number;
  speed: number;
  axis: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * axis[0];
    ref.current.rotation.y = t * axis[1];
    ref.current.rotation.z = t * axis[2];
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.005, 16, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function ParticleField({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#64ffda"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 5]} intensity={0.6} color="#64ffda" />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <HoloAvatar />
      </Float>

      <OrbitingRing radius={2.0} speed={0.4} axis={[0.4, 1, 0]} />
      <OrbitingRing radius={2.4} speed={0.3} axis={[1, 0.2, 0.4]} color="#a78bfa" />
      <OrbitingRing radius={2.8} speed={0.2} axis={[0.2, 0.6, 1]} color="#7dffe0" />

      <ParticleField count={600} />

      <Sparkles
        count={40}
        scale={6}
        size={2}
        speed={0.3}
        color="#64ffda"
        opacity={0.6}
      />

      <Stars
        radius={50}
        depth={20}
        count={1500}
        factor={2}
        saturation={0}
        fade
        speed={0.6}
      />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
