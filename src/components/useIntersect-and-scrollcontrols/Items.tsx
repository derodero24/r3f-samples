import { Image, Scroll, useIntersect } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { MathUtils, Mesh, Vector3 } from 'three';

import type { ExMaterial } from '../../types/three';

const BASE_PATH = '/useIntersect-and-scrollcontrols';

interface Props {
  url: string;
  scale: [number, number];
  position: Vector3;
}

function Item({ url, scale, ...props }: Props) {
  const visible = useRef(false);
  const [hovered, hover] = useState(false);
  const ref = useIntersect<Mesh>(isVisible => (visible.current = isVisible));
  const { height } = useThree(state => state.viewport);

  useFrame((_, delta) => {
    ref.current.position.y = MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta,
    );

    const mat = ref.current.material as ExMaterial;
    mat.zoom = MathUtils.damp(mat.zoom, visible.current ? 1 : 1.5, 4, delta);
    mat.grayscale = MathUtils.damp(mat.grayscale, hovered ? 0 : 1, 4, delta);
  });

  return (
    <group {...props}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={scale}
        url={BASE_PATH + url}
      />
    </group>
  );
}

export default function Items() {
  const { width: w, height: h } = useThree(state => state.viewport);
  return (
    <Scroll>
      <Item
        url="/1.jpg"
        scale={[w / 3, w / 3]}
        position={new Vector3(-w / 6, 0, 0)}
      />
      <Item
        url="/2.jpg"
        scale={[2, w / 3]}
        position={new Vector3(w / 30, -h, 0)}
      />
      <Item
        url="/3.jpg"
        scale={[w / 3, w / 5]}
        position={new Vector3(-w / 4, -h * 1, 0)}
      />
      <Item
        url="/4.jpg"
        scale={[w / 5, w / 5]}
        position={new Vector3(w / 4, -h * 1.2, 0)}
      />
      <Item
        url="/5.jpg"
        scale={[w / 5, w / 5]}
        position={new Vector3(w / 10, -h * 1.75, 0)}
      />
      <Item
        url="/6.jpg"
        scale={[w / 3, w / 3]}
        position={new Vector3(-w / 4, -h * 2, 0)}
      />
      <Item
        url="/7.jpg"
        scale={[w / 3, w / 5]}
        position={new Vector3(-w / 4, -h * 2.6, 0)}
      />
      <Item
        url="/8.jpg"
        scale={[w / 2, w / 2]}
        position={new Vector3(w / 4, -h * 3.1, 0)}
      />
      <Item
        url="/12.jpg"
        scale={[w / 2.5, w / 2]}
        position={new Vector3(-w / 6, -h * 4.1, 0)}
      />
    </Scroll>
  );
}
