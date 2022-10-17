import { CameraShake, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import { Suspense } from 'react';
import { Euler, Vector3 } from 'three';

import Ground from '../../components/reflectorplanes-and-bloom/Ground';
import Rig from '../../components/reflectorplanes-and-bloom/Rig';
import Triangle from '../../components/reflectorplanes-and-bloom/Triangle';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="h-screen">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 15] }}>
        <color attach="background" args={['black']} />
        <ambientLight />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
        <Suspense fallback={null}>
          <Rig>
            <Triangle
              color="#ff2060"
              scale={0.008}
              rotation={new Euler(0, 0, Math.PI / 3)}
            />
            <Triangle
              color="cyan"
              scale={0.008}
              position={new Vector3(2, 0, -2)}
              rotation={new Euler(0, 0, Math.PI / 3)}
            />
            <Triangle
              color="orange"
              scale={0.008}
              position={new Vector3(-2, 0, -2)}
              rotation={new Euler(0, 0, Math.PI / 3)}
            />
            <Triangle
              color="white"
              scale={0.008}
              position={new Vector3(0, 2, -10)}
              rotation={new Euler(0, 0, Math.PI / 3)}
            />
            <Ground
              mirror={1}
              blur={[500, 100]}
              mixBlur={12}
              mixStrength={1.5}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              position-y={-0.8}
            />
          </Rig>
          <EffectComposer multisampling={8}>
            <Bloom
              kernelSize={3}
              luminanceThreshold={0}
              luminanceSmoothing={0.4}
              intensity={0.6}
            />
            <Bloom
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            />
          </EffectComposer>
        </Suspense>
        <CameraShake
          yawFrequency={0.2}
          pitchFrequency={0.2}
          rollFrequency={0.2}
        />
      </Canvas>
    </div>
  );
};

export default Page;
