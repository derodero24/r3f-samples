import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';

import BackToTop from '../../components/smooth-scroll/BackToTop';
import Header from '../../components/smooth-scroll/Header';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="h-screen">
      <Canvas>
        {/* 高さ：スクリーンの3倍 */}
        <ScrollControls pages={3} distance={1} damping={15}>
          <Scroll html>
            <div ref={ref} />
            <div className="w-screen h-screen">
              <Header />
            </div>
          </Scroll>
        </ScrollControls>
        {/* <Debug /> */}
      </Canvas>
      <BackToTop topRef={ref} />
    </div>
  );
};

export default Page;
