// scene/Water.tsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, type ShaderMaterial } from "three";

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(vPos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uShallow;
  uniform vec3 uDeep;
  uniform vec3 uHighlight;
  varying vec3 vPos;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.02 + vec2(17.0, 9.0);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = vPos.xz;

    // warp the coordinates with slow noise so nothing lines up on a grid
    vec2 warp = vec2(
      fbm(p * 0.8 + uTime * 0.05),
      fbm(p * 0.8 - uTime * 0.05 + 5.2)
    );
    vec2 q = p + (warp - 0.5) * 1.2;

    float n = fbm(q * 1.5 + vec2(uTime * 0.08, uTime * 0.03));

    // depth: banded into 3 flat steps for the cartoon look
    float d = length(p / vec2(3.0, 1.8));
    float depth = 1.0;

    vec3 color = mix(uShallow, uDeep, depth);

    // soft two-tone patches (flat, no gradients)
    color *= 0.96 + 0.08 * step(0.5, n);

    // thin wavy highlight lines along a noise contour
    float line = smoothstep(0.50, 0.515, n) - smoothstep(0.535, 0.55, n);
    color = mix(color, uHighlight, line * 0.3);

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;
export function Water() {
  const ref = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uShallow: { value: new Color("#5fd4e0") },
      uDeep: { value: new Color("#1b6ca8") },
      uHighlight: { value: new Color("#ffffff") },
    }),
    [],
  );

  useFrame((_, dt) => {
    if (ref.current) ref.current.uniforms.uTime.value += dt;
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position-y={-0.05}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
