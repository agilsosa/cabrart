import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { Scene } from "../scene/Scene.tsx";
import { PanControls } from "./PanControls.tsx";
import { usePoiStore } from "../store/poiStore.ts";

export function MapView() {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      onPointerMissed={() => usePoiStore.getState().select(null)}
    >
      <color attach="background" args={["#7ec8e3"]} />
      <PerspectiveCamera makeDefault position={[0, 6, 0]} fov={35} />
      <PanControls limit={32} />
      <Suspense fallback={null}>
        <Scene></Scene>
      </Suspense>
    </Canvas>
  );
}
