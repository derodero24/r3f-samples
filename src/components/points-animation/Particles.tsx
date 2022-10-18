import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { BufferAttribute, SphereGeometry, TorusGeometry } from 'three';

import { fragmentShader, vertexShader } from './shader';

function reshape(array: number[], axis: number) {
  const reshaped = [];
  for (let i = 0; i < array.length; i += axis) {
    reshaped.push(array.slice(i, i + axis));
  }
  return reshaped;
}

function getRandom(array: ArrayLike<number>, size: number): Float32Array {
  const reshaped = reshape(Array.from(array), 3);
  const shuffled = reshaped.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, size);
  return Float32Array.from(selected.flat());
}

const N_POINTS = 600;
const sphere = getRandom(
  new SphereGeometry(1, 25, 25).attributes['position']!.array,
  N_POINTS * 3,
);
const torus = getRandom(
  new TorusGeometry(1, 1, 100).attributes['position']!.array,
  N_POINTS * 3,
);
console.log(sphere.length, torus.length);

export default function Particles() {
  const ref = useRef<BufferAttribute>(null);

  useFrame(() => {
    if (!ref.current) return;
    // 今の点群位置
    const positions = Array.from(ref.current.array);

    // 徐々にtorusに近づける
    const speed = 0.01;
    const newPositions = [];
    for (let i = 0; i < positions.length; i++) {
      const now = positions[i]!;
      const next = now + (torus[i]! - now) * speed;
      newPositions.push(next);
    }
    // 更新
    ref.current.array = Float32Array.from(newPositions);
    ref.current.needsUpdate = true;
  });

  const shaderArgs = useMemo(() => ({ vertexShader, fragmentShader }), []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={ref}
          attach="attributes-position"
          count={sphere.length / 3}
          itemSize={3}
          array={sphere}
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
