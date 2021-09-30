import '../styles/app.scss';
import Emission from './emission';

function App() {
  return (
    <div id="#app">
      {/* <Canvas className="c-globe">
        <ambientLight />
        <pointLight position={[30, 30, 30]} />
        <Globe />
      </Canvas> */}
      <Emission />
    </div>
  );
}

export default App;
