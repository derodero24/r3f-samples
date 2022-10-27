import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Debug from '../../components/common/Debug';
import Wall from '../../components/grid-by-line/Wall';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      <Canvas>
        <color attach="background" args={['gray']} />
        <OrbitControls />
        <Wall
          width={8}
          height={5}
          tileX={10}
          tileY={6}
          lineColor="#9c88ff"
          lineWidth={0.001}
        />
        <Debug />
      </Canvas>
    </div>
  );
};

export default Page;
