import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Particles from '../../components/points-animation/Particles';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['white']} />
        <OrbitControls makeDefault />
        <Stats />
        <Particles />
      </Canvas>
    </div>
  );
};

export default Page;
