import { Canvas } from '@react-three/fiber'
import '../styles/app.scss';
import Globe from 'react-globe.gl';
// import Globe from './globe';
import Something from './something';

function App() {
  return (
    <div id="#app">
      {/* <Canvas className="c-globe">
        <ambientLight />
        <pointLight position={[30, 30, 30]} />
        <Globe />
      </Canvas> */}
      <Globe />
      <Something />
    </div>
  );
}

export default App;
