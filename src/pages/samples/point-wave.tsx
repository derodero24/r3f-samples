import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

import Particles from '../../components/point-wave/Particles';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['white']} />
        <OrbitControls makeDefault />
        <Perf />
        <Particles />
      </Canvas>
    </div>
  );
};

export default Page;
