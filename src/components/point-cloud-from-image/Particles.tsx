import { useEffect, useMemo, useState } from 'react';

import { fragmentShader, vertexShader } from './shader';

function normalRand() {
  return (Math.random() - 0.5) * 2;
}

function ImagePixel(
  path: CanvasImageSource,
  w: number,
  h: number,
  ratio: number, // 何pxごとに点を打つか
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = w;
  const height = h;
  canvas.width = width;
  canvas.height = height;

  ctx?.drawImage(path, 0, 0);
  const data = ctx!.getImageData(0, 0, width, height).data;
  const position = [];
  const color = [];
  const alpha = [];

  const wrange = width / 2;
  const hrange = height / 2;

  for (let y = 0; y < height; y += ratio) {
    for (let x = 0; x < width; x += ratio) {
      const index = (y * width + x) * 4;

      // color
      const r = data[index]! / 255;
      const g = data[index + 1]! / 255;
      const b = data[index + 2]! / 255;
      const a = data[index + 3]! / 255 + normalRand() * 0.01;

      // position
      const scale = 4;
      const randomness = 0.01;
      const px = (x - wrange) / wrange;
      const py = -(y - hrange) / hrange;
      const X = (px + normalRand() * randomness) * scale;
      const Y = (py + normalRand() * randomness) * scale;

      position.push(X, Y, 0), color.push(r, g, b), alpha.push(a);
    }
  }

  return { position, color, alpha };
}

export default function Particles() {
  const shaderArgs = useMemo(() => ({ vertexShader, fragmentShader }), []);

  const [positions, setPositions] = useState<Float32Array>();
  const [colors, setColors] = useState<Float32Array>();
  const [alphas, setAlphas] = useState<Float32Array>();

  useEffect(() => {
    const img = new Image();
    img.src = '/point-cloud-from-image/brain.png';

    img.addEventListener('load', () => {
      const { position, color, alpha } = ImagePixel(
        img,
        img.width,
        img.height,
        2.0, // 何pxに一回点を打つか
      );
      console.log(position, color, alpha);
      console.log(position.length / 3, color.length / 3, alpha.length);
      setPositions(Float32Array.from(position));
      setColors(Float32Array.from(color));
      setAlphas(Float32Array.from(alpha));
    });
  }, []);

  return (
    <points>
      {positions && colors && alphas && (
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
            count={alphas.length}
            itemSize={1}
            array={alphas}
          />
        </bufferGeometry>
      )}

      <shaderMaterial
        args={[shaderArgs]}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </points>
  );
}
