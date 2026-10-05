import { Center, useGLTF } from "@react-three/drei";

export function Island() {
  const { scene } = useGLTF("/assets/island.glb");

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

useGLTF.preload("/assets/island.glb");
