import { Reflector, ReflectorProps, useTexture } from '@react-three/drei';
import { Vector2 } from 'three';

export default function Ground(props: ReflectorProps) {
  const [floor, normal] = useTexture([
    '/reflectorplanes-and-bloom/SurfaceImperfections003_1K_var1.jpg',
    '/reflectorplanes-and-bloom/SurfaceImperfections003_1K_Normal.jpg',
  ]);

  return (
    <Reflector resolution={1024} args={[8, 8]} {...props}>
      {(Material, props) => (
        /* @ts-expect-error :: for ignore TS2590*/
        <Material
          color="#f0f0f0"
          metalness={0}
          roughnessMap={floor ?? null}
          normalMap={normal ?? null}
          normalScale={new Vector2(2, 2)}
          {...props}
        />
      )}
    </Reflector>
  );
}
