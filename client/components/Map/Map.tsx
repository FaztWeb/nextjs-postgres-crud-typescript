import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import mapStyle from './Map.module.css';
import SceneView from '@arcgis/core/views/SceneView';
import '@arcgis/core/assets/esri/css/main.css';
import getView from './view';
// import './popup.module.css';

const MapP: NextPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<SceneView>();
  useEffect(() => {
    if (divRef.current && !view) {
      const view = getView(divRef.current);
      setView(view);
    }
  }, [divRef, view]);
  return <div className={mapStyle.container} ref={divRef}></div>;
};

export default MapP;
