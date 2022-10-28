import { Color, Object3DNode, extend, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

extend({ Line2, LineGeometry, LineMaterial });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      line2: Object3DNode<Line2, typeof Line2>;
      lineGeometry: Object3DNode<LineGeometry, typeof LineGeometry>;
      lineMaterial: Object3DNode<LineMaterial, typeof LineMaterial>;
    }
  }
}

interface Props {
  lineWidth?: number;
  lineColor?: Color;
}

const TILE_SIZE = 1;
const WIDTH = 40;
const HEIGHT = 12;

export default function Road({ lineWidth, lineColor }: Props) {
  const geometry = useRef<LineGeometry>(null);

  const minX = -WIDTH / 2;
  const maxX = WIDTH / 2;
  const minY = -HEIGHT / 2;
  const maxY = HEIGHT / 2;

  const speed = 0.4;

  useFrame(state => {
    state.clock.elapsedTime;

    const offset = TILE_SIZE * ((state.clock.elapsedTime * speed) % 1);

    const points = [];

    // 縦線
    const n_xlines = Math.ceil(WIDTH / TILE_SIZE) + 1;
    for (let i = 0; i < n_xlines; i++) {
      const top = [minX + TILE_SIZE * i, maxY, 0];
      const bottom = [minX + TILE_SIZE * i, minY, 0];
      if (i % 2) points.push(bottom, top);
      else points.push(top, bottom);
    }
    // 横線
    const n_zlines = Math.ceil(HEIGHT / TILE_SIZE) + 1;
    for (let i = 0; i < n_zlines; i++) {
      const left = [minX, minY + TILE_SIZE * i - offset, 0];
      const right = [maxX, minY + TILE_SIZE * i - offset, 0];
      if (i % 2) points.push(left, right);
      else points.push(right, left);
    }

    geometry.current?.setPositions(points.flat());
  });

  return (
    <line2 position={[0, 3, 0]} rotation={[-0.6, 0, 0]}>
      <lineGeometry ref={geometry} />
      <lineMaterial
        color={lineColor ?? '#ffffff'}
        linewidth={lineWidth ?? 0.001}
      />
    </line2>
  );
}
