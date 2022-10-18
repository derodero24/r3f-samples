import { useEffect, useMemo, useState } from 'react';

import { normalRand } from '../../utils';
import { fragmentShader, vertexShader } from './shader';

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

      position.push(X, Y, 0), color.push(r, g, b, a);
    }
  }

  return { position, color };
}

export default function Particles() {
  const shaderArgs = useMemo(() => ({ vertexShader, fragmentShader }), []);

  const [positions, setPositions] = useState<Float32Array>();
  const [colors, setColors] = useState<Float32Array>();

  useEffect(() => {
    const img = new Image();
    img.src = '/point-cloud-from-image/brain.png';

    img.addEventListener('load', () => {
      const { position, color } = ImagePixel(
        img,
        img.width,
        img.height,
        2.0, // 何pxに一回点を打つか
      );
      setPositions(Float32Array.from(position));
      setColors(Float32Array.from(color));
    });
  }, []);

  return (
    <points>
      {positions && colors && (
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
