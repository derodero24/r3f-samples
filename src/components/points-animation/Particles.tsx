import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BufferAttribute,
  BufferGeometry,
  SphereGeometry,
  TorusGeometry,
  TorusKnotGeometry,
} from 'three';

import { normalRand, randomChoise, to2dArray } from '../../utils';
import { fragmentShader, vertexShader } from './shader';

export function geometryPositions(
  geometry: BufferGeometry,
  n_points: number,
): Float32Array {
  const positions = geometry.attributes['position']!.array;
  console.log(positions.length);

  const reshaped = to2dArray(Array.from(positions), 3);
  const chosed = randomChoise(reshaped, n_points);
  return Float32Array.from(chosed.flat());
}

const N_POINTS = 2000;

const POINTS_DATA = {
  sphere: geometryPositions(new SphereGeometry(2, 50, 50), N_POINTS),
  torus: geometryPositions(new TorusGeometry(2, 0.8, 20, 120), N_POINTS),
  torusknot: geometryPositions(
    new TorusKnotGeometry(2, 0.3, 150, 16),
    N_POINTS,
  ),
};

const RANDS = Float32Array.from({ length: N_POINTS * 3 }).map(() =>
  normalRand(),
);

export default function Particles() {
  const [dataKey, setDataKey] = useState<keyof typeof POINTS_DATA>('torusknot');
  const ref = useRef<BufferAttribute>(null);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    // 今の点群位置
    const positions = Array.from(ref.current.array);

    // 徐々にtorusに近づける
    const speed = 0.02;
    const newPositions = [];
    for (let i = 0; i < positions.length; i++) {
      const now = positions[i]!;
      const next = now + (POINTS_DATA[dataKey][i]! - now) * speed;
      newPositions.push(next);
    }

    // ランダム値
    shaderArgs.uniforms.uTime.value += delta;

    // 更新
    ref.current.array = Float32Array.from(newPositions);
    ref.current.needsUpdate = true;
  });

  useEffect(() => {
    // 5秒毎にオブジェクト変更
    const timer = setInterval(() => {
      setDataKey(prev => {
        if (prev === 'sphere') return 'torus';
        else if (prev === 'torus') return 'torusknot';
        else return 'sphere';
      });
    }, 4_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={ref}
          attach="attributes-position"
          count={POINTS_DATA.sphere.length / 3}
          itemSize={3}
          array={POINTS_DATA.sphere}
        />
        <bufferAttribute
          attach="attributes-rand"
          count={RANDS.length / 3}
          itemSize={3}
          array={RANDS}
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
