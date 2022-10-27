import React, { useMemo } from 'react';
import { DoubleSide, PlaneGeometry, ShaderMaterial } from 'three';

import { fragmentShader, vertexShader } from './shader';

export default function Wall() {
  const geometry = useMemo(() => new PlaneGeometry(8, 5), []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          tileWidth: { value: 0.5 },
          lineWidth: { value: 0.01 },
        },
        transparent: true,
        side: DoubleSide,
        fog: true,
      }),
    [],
  );

  return <mesh geometry={geometry} material={material} />;
}
