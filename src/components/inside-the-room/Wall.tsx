import type { MeshProps } from '@react-three/fiber';

type Props = {
  width: number;
  height: number;
} & MeshProps;

export default function Wall({ width, height, ...props }: Props) {
  return (
    <mesh {...props}>
      <planeGeometry args={[width, height]} />
    </mesh>
  );
}
