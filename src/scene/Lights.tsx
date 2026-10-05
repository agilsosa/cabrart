export function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 30, 10]} intensity={2} />
    </>
  );
}
