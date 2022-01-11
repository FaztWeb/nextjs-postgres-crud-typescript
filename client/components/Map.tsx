import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import mapStyle from './Map.module.css';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Extent from '@arcgis/core/geometry/Extent';
import '@arcgis/core/assets/esri/css/main.css';
const MapP: NextPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<SceneView>();
  useEffect(() => {
    if (divRef.current && !view) {
      const renderer = {
        type: 'simple', // autocasts as new SimpleRenderer()
        symbol: {
          type: 'polygon-3d', // autocasts as new PolygonSymbol3D()
          symbolLayers: [
            { type: 'extrude', material: { color: 'orange' }, size: 30 },
          ], // autocasts as new ExtrudeSymbol3DLayer()
        },
      };

      const buildingsLayer = new FeatureLayer({
        portalItem: {
          id: '3677599f43b9484aa01a0ee212beb410',
        },
        labelsVisible: false,
        opacity: 1,
        definitionExpression: 'osm_id = 152474227 OR osm_id = 194450516',
        renderer: renderer as unknown as undefined,
      });

      const map = new Map({
        basemap: 'osm',
        layers: [buildingsLayer],
      });
      const view = new SceneView({
        clippingArea: new Extent({
          xmin: 21.201993,
          xmax: 21.258754,
          ymin: 45.720666,
          ymax: 45.777872,
        }),
        viewingMode: 'local',
        map: map,
        container: divRef.current,
        camera: {
          position: {
            x: 21.225468,
            y: 45.741524,
            z: 500,
          },
          heading: 0,
          tilt: 65,
        },
        environment: {
          lighting: {
            directShadowsEnabled: true,
          },
        },
      });
      setView(view);
    }
  }, [divRef, view]);
  return <div className={mapStyle.container} ref={divRef}></div>;
};

export default MapP;
