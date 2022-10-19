import { Canvas } from '@react-three/fiber';

import Rig from '../../components/inside-the-room/Rig';
import Room from '../../components/inside-the-room/Room';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['white']} />
        {/* <OrbitControls
          makeDefault
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
        /> */}
        <Rig>
          <Room x={10} y={6} z={20} />
        </Rig>
      </Canvas>
    </div>
  );
};

export default Page;
