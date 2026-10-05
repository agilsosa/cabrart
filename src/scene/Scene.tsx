import { Island } from "./Island.tsx";
import { Lights } from "./Lights.tsx";
import { PoiMarkers } from "./PoiMarkers.tsx";
import { Water } from "./Water";

export function Scene() {
  return (
    <>
      <Lights />
      <Island />
      <PoiMarkers />
      <Water />
    </>
  );
}
