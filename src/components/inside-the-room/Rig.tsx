import { useFrame, useThree } from '@react-three/fiber';
import { ReactNode, useRef } from 'react';
import { Group, Vector3 } from 'three';

interface Props {
  children: ReactNode;
}

export default function Rig({ children }: Props) {
  const ref = useRef<Group>(null);
  const vec = new Vector3();
  const { mouse } = useThree();

  useFrame(state => {
    if (ref.current) {
      // カメラ微移動
      ref.current.position.lerp(
        vec.set(-mouse.x * 0.5, mouse.y * -0.5, 0),
        0.05, // 速度
      );

      // 縦長画面のときのスケール調整
      if (state.viewport.aspect < 1.1) {
        const scale = Math.min(state.viewport.aspect, 1);
        ref.current.scale.lerp(vec.set(scale, scale, scale), 0.1);
      }
    }
  });

  return <group ref={ref}>{children}</group>;
}
