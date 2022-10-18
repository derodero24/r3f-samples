import { Html } from '@react-three/drei';
import { Ref, forwardRef } from 'react';

import type { Vector3 } from 'three';

interface Props {
  head: string;
  stat: string;
  expl: string;
  position: Vector3;
}

function Tag(props: Props, ref: Ref<HTMLDivElement>) {
  return (
    <Html ref={ref} className="data show" center position={props.position}>
      <div>{props.head}</div>
      <h1>{props.stat}</h1>
      <h2>{props.expl}</h2>
    </Html>
  );
}

export default forwardRef(Tag);
