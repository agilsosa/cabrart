// scene/PoiMarkers.tsx
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { POIS, CATEGORY_COLOR, type Poi } from "../data/pois";
import { usePoiStore } from "../store/poiStore";

function Marker({ poi }: { poi: Poi }) {
  const ref = useRef<Group>(null);
  const select = usePoiStore((s) => s.select);
  const selected = usePoiStore((s) => s.selectedId === poi.id);

  const [_hovered, setHovered] = useState(false);
  const REF_DIST = 6; // your starting camera height
  const FOLLOW = 0.2; // 0 = fixed world size (shrinks with the map), 1 = fixed screen size

  useFrame(({ camera, clock }) => {
    if (!ref.current) return;
    const dist = camera.position.y;
    const s = 0.3 * Math.pow(dist / REF_DIST, FOLLOW) * (selected ? 1.35 : 1);
    ref.current.scale.setScalar(s);
    ref.current.position.y =
      0.08 + Math.sin(clock.elapsedTime * 2 + poi.position[0]) * 0.01;
  });
  return (
    <group
      ref={ref}
      position={[poi.position[0], 0.08, poi.position[1]]}
      onClick={(e) => {
        if (e.delta > 5) return;
        e.stopPropagation();
        select(selected ? null : poi.id);
      }}
    >
      {/* big invisible hit area: easy to tap with a finger */}

      <mesh
        rotation-x={-Math.PI / 2}
        onClick={(e) => {
          if (e.delta > 5) return; // it was a drag-pan, not a tap
          e.stopPropagation();
          select(poi.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <circleGeometry args={[1.8, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* white ring + colored disc */}
      <mesh rotation-x={-Math.PI / 2} renderOrder={10}>
        <circleGeometry args={[1.15, 32]} />
        <meshBasicMaterial color="white" depthTest={false} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.001} renderOrder={11}>
        <circleGeometry args={[0.9, 32]} />
        <meshBasicMaterial
          color={CATEGORY_COLOR[poi.category]}
          depthTest={false}
        />
      </mesh>
    </group>
  );
}

export function PoiMarkers() {
  const selectedId = usePoiStore((s) => s.selectedId);
  return (
    <>
      {POIS.filter((p) => !p.onlyWhenSelected || p.id === selectedId).map(
        (p) => (
          <Marker key={p.id} poi={p} />
        ),
      )}
    </>
  );
}
