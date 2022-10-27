import { Color, Object3DNode, extend } from '@react-three/fiber';
import React, { useMemo } from 'react';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

extend({ Line2, LineMaterial, LineGeometry });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      line2: Object3DNode<Line2, typeof Line2>;
      lineMaterial: Object3DNode<LineMaterial, typeof LineMaterial>;
    }
  }
}

interface Props {
  width: number;
  height: number;
  tileX: number;
  tileY: number;
  lineWidth?: number;
  lineColor?: Color;
}

export default function Wall({
  width,
  height,
  tileX,
  tileY,
  lineWidth,
  lineColor,
}: Props) {
  const geometry = useMemo(() => {
    const minX = -width / 2;
    const maxX = width / 2;
    const minY = -height / 2;
    const maxY = height / 2;

    const tileWidth = width / tileX;
    const tileHeight = height / tileY;

    const points = [];

    // 縦線
    for (let i = 0; i < tileX + 1; i++) {
      const top = [minX + tileWidth * i, maxY, 0];
      const bottom = [minX + tileWidth * i, minY, 0];
      if (i % 2) points.push(bottom, top);
      else points.push(top, bottom);
    }
    // 横線
    for (let i = 0; i < tileY + 1; i++) {
      const left = [minX, minY + tileHeight * i, 0];
      const right = [maxX, minY + tileHeight * i, 0];
      if (i % 2) points.push(left, right);
      else points.push(right, left);
    }

    return new LineGeometry().setPositions(points.flat());
  }, [width, height, tileX, tileY]);

  return (
    <line2 geometry={geometry}>
      <lineMaterial
        color={lineColor ?? '#ffffff'}
        linewidth={lineWidth ?? 0.001}
      />
    </line2>
  );
}
