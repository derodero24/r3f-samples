import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Particles from '../../components/points-animation/Particles';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      {/* fov: 視野角, 遠近感を和らげるために下げておく */}
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 40 }}>
        <color attach="background" args={['black']} />
        <OrbitControls makeDefault />
        <Stats />
        <Particles />
      </Canvas>
    </div>
  );
};

export default Page;
