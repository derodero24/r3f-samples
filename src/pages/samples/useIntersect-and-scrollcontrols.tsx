import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Items from '../../components/useIntersect-and-scrollcontrols/Items';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="useIntersect-and-scrollcontrols h-screen">
      <Canvas
        orthographic
        camera={{ zoom: 80 }}
        gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#f0f0f0']} />
        <ScrollControls damping={6} pages={5}>
          <Items />
          <Scroll html>
            <h1
              style={{
                top: `100vh`,
                left: '50vw',
                fontSize: '20rem',
                transform: `translate3d(0,-100%,0)`,
              }}
            >
              all
            </h1>
            <h1 style={{ top: '180vh', left: '10vw' }}>hail</h1>
            <h1 style={{ top: '260vh', left: '50vw' }}>thee,</h1>
            <h1 style={{ top: '350vh', left: '10vw' }}>thoth</h1>
            <h1 style={{ top: '450vh', left: '60vw' }}>
              her <br /> mes.
            </h1>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default Page;
