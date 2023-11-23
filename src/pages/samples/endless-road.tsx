import { Canvas } from '@react-three/fiber';

import Debug from '../../components/common/Debug';
import Road from '../../components/endless-road/Road';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-screen items-end bg-gray-800">
      <div className="h-1/2 w-full">
        <Canvas>
          {/* <OrbitControls /> */}
          <Road lineColor="#9c88ff" lineWidth={0.002} />
          <Debug />
        </Canvas>
      </div>
      <div className="absolute h-1/2 w-full bg-gradient-to-b from-gray-800 to-transparent" />
    </div>
  );
};

export default Page;
