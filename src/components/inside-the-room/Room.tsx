import { useTexture } from '@react-three/drei';
import { useMemo } from 'react';
import { MeshBasicMaterial } from 'three';

import Wall from './Wall';

interface Props {
  x: number;
  y: number;
  z: number;
}

export default function Room({ x, y, z }: Props) {
  const textureProps = useTexture({
    map: '/inside-the-room/texture.webp',
  });

  const material = useMemo(
    () => new MeshBasicMaterial({ ...textureProps }),
    [textureProps],
  );

  return (
    <>
      <ambientLight intensity={1} />
      {/* 奥 */}
      <Wall
        width={x}
        height={y}
        material={material}
        position={[0, 0, -z / 2]}
      />
      {/* 上 */}
      <Wall
        width={x}
        height={z}
        material={material}
        position={[0, y / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* 下 */}
      <Wall
        width={x}
        height={z}
        material={material}
        position={[0, -y / 2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      {/* 右 */}
      <Wall
        width={z}
        height={y}
        material={material}
        position={[x / 2, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      {/* 左 */}
      <Wall
        width={z}
        height={y}
        material={material}
        position={[-x / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </>
  );
}
