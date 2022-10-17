import { useFrame, useThree } from '@react-three/fiber';
import { ReactNode, useRef } from 'react';
import { Group, MathUtils, Vector3 } from 'three';

interface Props {
  children: ReactNode;
}

export default function Rig({ children }: Props) {
  const ref = useRef<Group>(null);
  const vec = new Vector3();
  const { camera, mouse } = useThree();

  useFrame(() => {
    // lerpを使ったアニメーション
    // vecA.lerp(vecB, 0.2) -> vecAをvecBに20%ずつ近づける

    // カメラ移動
    camera.position.lerp(vec.set(mouse.x * 2, 0, 5), 0.05);

    // groupの移動
    if (ref.current) {
      ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);

      // 横方向は0点を中心に回転させる
      ref.current.rotation.y = MathUtils.lerp(
        ref.current.rotation.y,
        (-mouse.x * Math.PI) / 20,
        0.1,
      );
    }
  });

  return <group ref={ref}>{children}</group>;
}
