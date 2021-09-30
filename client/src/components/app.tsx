import { Canvas } from '@react-three/fiber'
import '../styles/app.scss';
import Globe from './globe';

function App() {
  return (
    <div id="#app">
      <Canvas className="c-globe">
        <ambientLight />
        <pointLight position={[30, 30, 30]} />
        <Globe />
      </Canvas>
    </div>
  );
}

export default App;
