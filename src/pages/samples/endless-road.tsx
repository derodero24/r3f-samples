import { Canvas } from '@react-three/fiber';

import Debug from '../../components/common/Debug';
import Road from '../../components/endless-road/Road';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="bg-gray-800 h-screen flex items-end">
      <div className="w-full h-1/2">
        <Canvas>
          {/* <OrbitControls /> */}
          <Road lineColor="#9c88ff" lineWidth={0.002} />
          <Debug />
        </Canvas>
      </div>
      <div className="absolute w-full h-1/2 from-gray-800 to-transparent bg-gradient-to-b" />
    </div>
  );
};

export default Page;
