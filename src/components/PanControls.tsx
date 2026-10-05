import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import { MathUtils } from "three";
import type { MapControls as MapControlsImpl } from "three-stdlib";
import { usePoiStore } from "../store/poiStore";
import { POIS } from "../data/pois";

export function PanControls({ limit }: { limit: number }) {
  const ref = useRef<MapControlsImpl>(null);
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const easing = useRef(false);
  useEffect(() => {
    const el = gl.domElement;
    const original = el.releasePointerCapture.bind(el);
    el.releasePointerCapture = (id: number) => {
      if (el.hasPointerCapture(id)) original(id);
    };
    return () => {
      el.releasePointerCapture = original;
    };
  }, [gl]);

  useEffect(
    () =>
      usePoiStore.subscribe((s, prev) => {
        if (s.selectedId && s.selectedId !== prev.selectedId)
          easing.current = true;
      }),
    [],
  );

  const clampPan = () => {
    const t = ref.current?.target;
    if (!t) return;
    const x = MathUtils.clamp(t.x, -limit, limit);
    const z = MathUtils.clamp(t.z, -limit, limit);
    camera.position.x += x - t.x;
    camera.position.z += z - t.z;
    t.x = x;
    t.z = z;
  };

  useFrame(() => {
    if (!easing.current) return;
    const poi = POIS.find((p) => p.id === usePoiStore.getState().selectedId);
    const t = ref.current?.target;
    if (!poi || !t) {
      easing.current = false;
      return;
    }

    const offsetZ = camera.position.y * 0.17;
    const tx = poi.position[0];
    const tz = poi.position[1] + offsetZ;
    const dx = (tx - t.x) * 0.08;
    const dz = (tz - t.z) * 0.08;
    t.x += dx;
    t.z += dz;
    camera.position.x += dx;
    camera.position.z += dz;

    if (Math.hypot(tx - t.x, tz - t.z) < 0.01) easing.current = false; // arrived
  });
  return (
    <MapControls
      ref={ref}
      onStart={() => {
        easing.current = false;
      }}
      enableRotate={false}
      enableDamping
      dampingFactor={0.05}
      minDistance={8}
      maxDistance={40}
      onChange={clampPan}
    />
  );
}
