import { useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

export default function Debug() {
  const { width } = useThree(s => s.size);
  return <Perf minimal={width < 640} />;
}
