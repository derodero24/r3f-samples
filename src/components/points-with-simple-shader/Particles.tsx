import { useMemo } from 'react';

import { fragmentShader, vertexShader } from './shader';

export default function Particles() {
  const count = 500;
  const { positions, colors } = useMemo(() => {
    return {
      positions: Float32Array.from({ length: count * 3 }).map(
        () => (Math.random() - 0.5) * 10,
      ),
      colors: Float32Array.from({ length: count * 4 }).map(() => Math.random()),
    };
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
          count={colors.length / 4}
          itemSize={4}
          array={colors}
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
