import { ScrollControls, softShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import type { NextPage } from 'next';

softShadows();

const Page: NextPage = () => {
  return (
    <main className="h-screen">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, -3.2, 40], fov: 12 }}
      >
        <ScrollControls pages={2}>{/* <Composition /> */}</ScrollControls>
      </Canvas>
    </main>
  );
};

export default Page;
