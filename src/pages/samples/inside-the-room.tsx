import { Canvas } from '@react-three/fiber';

import Debug from '../../components/common/Debug';
import Rig from '../../components/inside-the-room/Rig';
import Room from '../../components/inside-the-room/Room';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      <Canvas>
        <color attach="background" args={['white']} />
        <Rig>
          <Room x={10} y={6} z={20} />
        </Rig>
        <Debug />
      </Canvas>
    </div>
  );
};

export default Page;
