import { useFrame, useLoader } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import { SVGLoader, StrokeStyle } from 'three/examples/jsm/loaders/SVGLoader';

import type { Euler, Group, Vector3 } from 'three';

interface Props {
  color: string;
  scale: number;
  position?: Vector3;
  rotation: Euler;
}

export default function Triangle({ color, ...props }: Props) {
  const ref = useRef<Group>(null);
  const [r] = useState(() => Math.random() * 10000);

  useFrame(_ => {
    if (ref.current) {
      ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime + r) / 10;
    }
  });

  const { paths } = useLoader(
    SVGLoader,
    '/reflectorplanes-and-bloom/triangle.svg',
  );

  const geom = useMemo(
    () =>
      SVGLoader.pointsToStroke(
        paths[0]?.subPaths[0].getPoints() as Vector3[],
        paths[0]?.userData?.['style'] as StrokeStyle,
      ),
    [paths],
  );

  return (
    <group ref={ref}>
      <mesh geometry={geom} {...props}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}
