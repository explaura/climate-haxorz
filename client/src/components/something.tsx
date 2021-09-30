import { useEffect, useRef, useState } from "react";
import Globe from 'react-globe.gl';
import { csvParse, scaleSequentialSqrt, interpolateYlOrRd } from 'd3';

function Something() {
    
    const globeEl = useRef<any>();
    const [popData, setPopData] = useState<any>([]);
    console.log(popData)

    useEffect(() => {
      // load data
      fetch('../emission.csv').then(res => res.text())
        .then(async csv => {
            const data = csvParse(csv, ({ lat, lng, pop }) => ({ lat: lat, lng: lng, pop: pop }));
            console.log('data', data);
            return data;
        })
        .then(setPopData);
    }, []);

    useEffect(() => {
        if(typeof globeEl.current?.controls != 'function') return;
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.1;
    }, []);

    const weightColor = scaleSequentialSqrt(interpolateYlOrRd)
      .domain([0, 1e7]);

    return <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

      hexBinPointsData={popData}
      hexBinPointWeight="pop"
      hexAltitude={d => d.sumWeight * 6e-8}
      hexBinResolution={4}
      hexTopColor={d => weightColor(d.sumWeight)}
      hexSideColor={d => weightColor(d.sumWeight)}
      hexBinMerge={true}
      enablePointerInteraction={false}
    />;
}

export default Something;