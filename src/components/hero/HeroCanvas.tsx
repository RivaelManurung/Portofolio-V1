"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Cheap WebGL capability probe so we never mount a Canvas that would throw. */
function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

const COUNT = 2600;
const RADIUS = 5;

/** A drifting monochrome particle constellation that reacts to the pointer. */
function Particles({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const positions = useMemo(() => {
    // Deterministic Fibonacci-sphere distribution (pure — no Math.random).
    const arr = new Float32Array(COUNT * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      // Per-index depth variation via the fractional part of the golden ratio.
      const shell = 0.6 + 0.4 * ((i * 0.6180339887) % 1);
      const r = RADIUS * shell;
      arr[i * 3] = Math.cos(theta) * ring * r;
      arr[i * 3 + 1] = y * r;
      arr[i * 3 + 2] = Math.sin(theta) * ring * r;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    const points = group.current;
    if (!points) return;
    if (reduced) {
      points.rotation.set(0.2, 0.3, 0);
      return;
    }
    // Slow autonomous drift + easing toward the pointer for a parallax tilt.
    points.rotation.y += delta * 0.05;
    points.rotation.x += delta * 0.02;
    points.position.x = THREE.MathUtils.lerp(points.position.x, pointer.x * 0.4, 0.04);
    points.position.y = THREE.MathUtils.lerp(points.position.y, pointer.y * 0.4, 0.04);
  });

  return (
    <points ref={group}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#171717"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas({ reduced = false }: { reduced?: boolean }) {
  // Probe once on the client (component is dynamic, ssr:false). If WebGL is
  // unavailable we render nothing — no Canvas, no console error, graceful.
  const [supported] = useState(() => webglSupported());
  if (!supported) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden
    >
      <Particles reduced={reduced} />
    </Canvas>
  );
}
