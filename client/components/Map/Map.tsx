import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import mapStyle from './Map.module.css';
import SceneView from '@arcgis/core/views/SceneView';
import '@arcgis/core/assets/esri/css/main.css';
import getView from './view';
import coordinates from 'lib/moveTo';
import { tap } from 'rxjs';

const MapP: NextPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<SceneView>();
  useEffect(() => {
    if (divRef.current && !view) {
      const view = getView(divRef.current);
      setView(view);
    }

    coordinates
      .pipe(
        tap(([lat, long]) => {
          console.log(lat, long);
          view?.goTo({
            center: [long, lat],
            zoom: 20,
          });
        })
      )
      .subscribe();
  }, [divRef, view]);
  return (
    <div className={mapStyle.container}>
      <div className={mapStyle.map} ref={divRef}></div>
    </div>
  );
};

export default MapP;
