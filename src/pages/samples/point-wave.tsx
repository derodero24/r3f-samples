import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Debug from '../../components/common/Debug';
import Particles from '../../components/point-wave/Particles';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['white']} />
        <OrbitControls makeDefault />
        <Debug />
        <Particles />
      </Canvas>
    </div>
  );
};

export default Page;
