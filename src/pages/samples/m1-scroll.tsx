import { ScrollControls, softShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Debug from '../../components/common/Debug';
import Composition from '../../components/m1-scroll/Composition';

import type { NextPage } from 'next';

softShadows();

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, -3.2, 40], fov: 12 }}
      >
        <color attach="background" args={['white']} />
        {/* 高さ：スクリーンの3倍 */}
        <ScrollControls pages={3}>
          <Composition />
        </ScrollControls>
        <Debug />
      </Canvas>
    </div>
  );
};

export default Page;
