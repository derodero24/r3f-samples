import { useTexture } from '@react-three/drei';
import { DoubleSide } from 'three';

import type { MeshProps } from '@react-three/fiber';

type Props = { width: number; height: number } & MeshProps;

export default function Wall({ width, height, ...props }: Props) {
  const textureProps = useTexture({
    map: '/inside-the-room/texture.webp',
  });
  return (
    <mesh {...props}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial {...textureProps} side={DoubleSide} />
    </mesh>
  );
}
