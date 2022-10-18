import { OrthographicCamera, useScroll, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { DirectionalLight, Euler, MathUtils, Vector3 } from 'three';

import M1 from './M1';
import Tag from './Tag';

const rsqw = (t: number, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) =>
  (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);

export default function Composition() {
  const scroll = useScroll();
  const { width, height } = useThree(state => state.viewport);

  const keyLight = useRef<DirectionalLight>(null);
  const group = useRef<THREE.Group>(null);
  const mbp16 = useRef<THREE.Group>(null);
  const mbp14 = useRef<THREE.Group>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  const [textureRed, textureBlue] = useTexture([
    '/m1-scroll/Chroma Red.jpg',
    '/m1-scroll/Chroma Blue.jpg',
  ]);

  useFrame((_, delta) => {
    if (
      !mbp16.current ||
      !mbp14.current ||
      !group.current ||
      !keyLight.current ||
      !left.current ||
      !right.current
    )
      return;

    const r1 = scroll.range(0 / 4, 1 / 4);
    const r2 = scroll.range(1 / 4, 1 / 4);
    const r3 = scroll.visible(4 / 5, 1 / 5);

    mbp16.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(r1) + r2 * 0.33;
    mbp14.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(r1) - r2 * 0.39;
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      (-Math.PI / 1.45) * r2,
      4,
      delta,
    );
    group.current.position.x = MathUtils.damp(
      group.current.position.x,
      (-width / 7) * r2,
      4,
      delta,
    );
    group.current.scale.x =
      group.current.scale.y =
      group.current.scale.z =
        MathUtils.damp(
          group.current.scale.z,
          1 + 0.24 * (1 - rsqw(r1)),
          4,
          delta,
        );
    keyLight.current.position.set(
      0.25 + -15 * (1 - r1),
      4 + 11 * (1 - r1),
      3 + 2 * (1 - r1),
    );

    // left.current.classList.toggle('show', r3);
    // right.current.classList.toggle('show', r3);
  });

  return (
    <>
      <spotLight position={[0, -width * 0.7, 0]} intensity={0.5} />
      <directionalLight ref={keyLight} castShadow intensity={6}>
        <OrthographicCamera
          // attach="camera"
          // attach="shadow"
          // attachObject={['shadow', 'camera']}
          // attach={['shadow', 'camera'] as AttachType}
          args={[-10, 10, 10, -10, 0.5, 30]}
        />
      </directionalLight>
      <group ref={group} position={[0, -height / 2.65, 0]}>
        <spotLight
          position={[width * 2.5, 0, width]}
          angle={0.19}
          penumbra={1}
          intensity={0.25}
        />
        <spotLight
          position={[0, -width / 2.4, -width * 2.2]}
          angle={0.2}
          penumbra={1}
          intensity={2}
          distance={width * 3}
        />

        {/* 16-inch */}
        <M1 ref={mbp16} texture={textureRed!} scale={width / 67}>
          <Tag
            ref={left}
            position={new Vector3(16, 5, 0)}
            head="up to"
            stat="13x"
            expl={'faster\ngraphics\nperformance²'}
          />
        </M1>

        {/* 14-inch */}
        <M1
          ref={mbp14}
          texture={textureBlue!}
          scale={width / 77}
          rotation={new Euler(0, Math.PI, 0)}
          position={new Vector3(0, 0, -width / 2.625)}
        >
          <Tag
            ref={right}
            position={new Vector3(10, 14, 0)}
            head="up to"
            stat="3.7x"
            expl={'faster CPU\nperformance¹'}
          />
        </M1>
      </group>
    </>
  );
}
