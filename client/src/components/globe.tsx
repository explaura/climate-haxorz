import { useRef } from "react";
import { useFrame } from '@react-three/fiber'
import Three, { Matrix4 } from 'three';
import Fire from "./fire";

type Props = JSX.IntrinsicElements['mesh']

export const GLOBE_RADIUS: number = 8;

function Globe(props: Props) {
  const ref = useRef<Three.Mesh>(null);
  const theta = useRef(0);
  const firePosition = useRef({ x: 0, y: 0, z: 0});

  useFrame((state, delta) => {
    const globe = ref.current;
    if(!globe) return;

    globe.rotation.x += 0.01;
    theta.current += 2 * Math.PI / GLOBE_RADIUS;
    // globe.rotation.y += 0.01;
    // globe.rotation.z += 0.01;

    firePosition.current.x = GLOBE_RADIUS * Math.cos(theta.current);
    firePosition.current.z = GLOBE_RADIUS * Math.sin(theta.current) 
    
  // console.log(firePosition)
  });


  return (
    <mesh {...props} ref={ref}>
      <sphereBufferGeometry args={[GLOBE_RADIUS, 50, 50]} />
      <meshStandardMaterial color={'blue'} />
      <Fire position={[2, 2, firePosition.current.z]}/>
    </mesh> 
  );
}

export default Globe;