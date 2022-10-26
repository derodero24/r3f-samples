import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Road from '../../components/grid-by-shader/Road';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['gray']} />
        <OrbitControls />
        <ambientLight intensity={1} />
        <Road />
      </Canvas>
    </div>
  );
};

export default Page;
