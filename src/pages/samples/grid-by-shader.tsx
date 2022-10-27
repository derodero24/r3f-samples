import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Debug from '../../components/common/Debug';
import Wall from '../../components/grid-by-shader/Wall';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      <Canvas>
        <color attach="background" args={['gray']} />
        <OrbitControls />
        <Wall />
        <Debug />
      </Canvas>
    </div>
  );
};

export default Page;
