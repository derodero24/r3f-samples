import { useFBX } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BufferAttribute,
  BufferGeometry,
  Mesh,
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

const N_POINTS = 5000;

const RANDS = Float32Array.from({ length: N_POINTS * 3 }).map(() =>
  normalRand(),
);

export default function Particles() {
  const fbx = useFBX('/points-animation/stanford-bunny.fbx');

  const points_data = useMemo(
    () => ({
      sphere: geometryPositions(new SphereGeometry(2, 80, 80), N_POINTS),
      torus: geometryPositions(new TorusGeometry(2, 0.8, 50, 140), N_POINTS),
      torusknot: geometryPositions(
        new TorusKnotGeometry(2, 0.3, 280, 22),
        N_POINTS,
      ),
      bunny: geometryPositions(
        (fbx.children[0] as Mesh).geometry,
        N_POINTS,
      ).map(x => x / 100),
    }),
    [fbx.children],
  );

  console.log(fbx.children[0] as Mesh);

  const [dataKey, setDataKey] = useState<keyof typeof points_data>('sphere');
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
      const next = now + (points_data[dataKey][i]! - now) * speed;
      newPositions.push(next);
    }

    // ランダム値
    shaderArgs.uniforms.uTime.value += delta;

    // 更新
    ref.current.array = Float32Array.from(newPositions);
    ref.current.needsUpdate = true;
  });

  const changeObject = () => {
    setDataKey(prev => {
      if (prev === 'sphere') return 'torus';
      else if (prev === 'torus') return 'torusknot';
      else if (prev === 'torusknot') return 'bunny';
      else return 'sphere';
    });
  };

  useEffect(() => {
    // 8秒毎にオブジェクト変更
    changeObject();
    const timer = setInterval(changeObject, 8_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={ref}
          attach="attributes-position"
          count={points_data.sphere.length / 3}
          itemSize={3}
          array={points_data.sphere}
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
