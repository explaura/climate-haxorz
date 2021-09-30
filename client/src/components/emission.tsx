import { useEffect, useRef, useState } from "react";
import Globe from 'react-globe.gl';
import { scaleSequentialSqrt, interpolateYlOrRd } from 'd3';

function Emission() {
    const globeRef = useRef<any>();
    const [emissionData, setEmissionData] = useState<any>([]);

    async function fetchEmissionData() {
      try {
        const emissionData = await fetch('/assets/emission-placeholder.json').then(res => res.json());
        setEmissionData(emissionData);
      } catch (error) {
        // handle error
      }
    }
    
    useEffect(() => {
      fetchEmissionData();

      if(typeof globeRef.current?.controls != 'function') return;
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.1;
    }, []);

    return (
      <Globe
        ref={globeRef}
        globeImageUrl="/assets/texture.jpg"
        bumpImageUrl="/assets/topology.png"
        backgroundImageUrl="/assets/sky.png"
        hexBinPointsData={emissionData}
        hexBinPointWeight="pop"
        hexAltitude={d => d.sumWeight * 6e-8}
        hexBinResolution={4}
        hexBinMerge={true}
        enablePointerInteraction={false}
      />
    );
}

export default Emission;