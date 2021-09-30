import { useRef } from "react";
import { useFrame } from '@react-three/fiber'
import Three from 'three';

function Globe(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<Three.Mesh>(null);

  useFrame((state, delta) => {
    const globe = ref.current;
    if(!globe) return;

    globe.rotation.x += 0.01;
    globe.rotation.y += 0.01;
  });

  return (
    <mesh {...props} ref={ref}>
      <sphereBufferGeometry args={[1, 30, 30]} />
      <meshStandardMaterial color={'pink'} />
    </mesh> 
  );
}

export default Globe;