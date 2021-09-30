import { useRef } from "react";
import Three from 'three';

type Props = JSX.IntrinsicElements['mesh'];

function Fire(props: Props) {
  const ref = useRef<Three.Mesh>(null);
  
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

export default Fire;