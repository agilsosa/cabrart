// scene/Clouds.tsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Cloud, Clouds as CloudsRoot } from "@react-three/drei";
import { MeshBasicMaterial, type Group } from "three";

const FIELD_X = 14; // clouds live in x: [-14, 14] and wrap around
const FIELD_Z = 8; // and z: [-8, 8]
const COLS = 5;
const ROWS = 3;
const KEEP = 0.55; // chance a grid cell gets a cloud (lower = sparser)

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type CloudData = {
  seed: number;
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  volume: number;
  segments: number;
  opacity: number;
  speed: number;
};

function generateClouds(): CloudData[] {
  const rand = mulberry32(11); // change for a different layout
  const cellW = (FIELD_X * 2) / COLS;
  const cellH = (FIELD_Z * 2) / ROWS;
  const clouds: CloudData[] = [];

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (rand() > KEEP) continue;

      const size = 1 + rand() * 0.8; // 1.0 .. 1.8
      clouds.push({
        seed: Math.floor(rand() * 1000),
        // cell center + random jitter, so coverage is even but not gridlike
        x: -FIELD_X + (i + 0.5) * cellW + (rand() - 0.5) * cellW * 0.7,
        z: -FIELD_Z + (j + 0.5) * cellH + (rand() - 0.5) * cellH * 0.7,
        y: 1.8 + rand() * 0.8,
        w: 4 * size,
        d: 2.5 * size,
        volume: 3 + size * 2,
        segments: 10 + Math.floor(rand() * 6),
        opacity: 0.5 + rand() * 0.3,
        speed: 0.1 + rand() * 0.25,
      });
    }
  }
  return clouds;
}

function DriftingCloud({ c }: { c: CloudData }) {
  const ref = useRef<Group>(null);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    g.position.x += dt * c.speed;
    if (g.position.x > FIELD_X) g.position.x -= FIELD_X * 2;
  });

  return (
    <group ref={ref} position={[c.x, c.y, c.z]}>
      <Cloud
        seed={c.seed}
        bounds={[c.w, 0.5, c.d]}
        volume={c.volume}
        segments={c.segments}
        opacity={c.opacity}
        fade={1}
      />
    </group>
  );
}

export function Clouds() {
  const clouds = useMemo(generateClouds, []);

  return (
    <CloudsRoot material={MeshBasicMaterial} limit={400} frustumCulled={false}>
      {clouds.map((c, i) => (
        <DriftingCloud key={i} c={c} />
      ))}
    </CloudsRoot>
  );
}
