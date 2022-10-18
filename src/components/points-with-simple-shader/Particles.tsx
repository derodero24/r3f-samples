import { useMemo } from 'react';

import { fragmentShader, vertexShader } from './shader';

export default function Particles() {
  const count = 500;
  const [positions, colors, alpha] = useMemo(() => {
    const positions = Float32Array.from({ length: count * 3 }).map(
      () => (Math.random() - 0.5) * 10,
    );
    const colors = Float32Array.from({ length: count * 3 }).map(() =>
      Math.random(),
    );
    const alpha = Float32Array.from({ length: count }).map(() => Math.random());
    return [positions, colors, alpha];
  }, []);

  const shaderArgs = useMemo(() => ({ vertexShader, fragmentShader }), []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          itemSize={3}
          array={positions}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          itemSize={3}
          array={colors}
        />
        <bufferAttribute
          attach="attributes-alpha"
          count={alpha.length}
          itemSize={1}
          array={alpha}
        />
      </bufferGeometry>

      <shaderMaterial
        args={[shaderArgs]}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </points>
  );
}
