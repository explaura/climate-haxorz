import { useRef } from "react";
import Three from 'three';

type Props = JSX.IntrinsicElements['mesh'] & {
  
}

function Tree(props: Props) {
  const ref = useRef<Three.Mesh>(null);

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 30, 30]} />
      <meshStandardMaterial color={'green'} />
    </mesh>
  );
}

export default Tree;
