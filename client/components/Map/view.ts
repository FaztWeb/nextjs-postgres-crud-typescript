import SceneView from '@arcgis/core/views/SceneView';
import Extent from '@arcgis/core/geometry/Extent';
import map from './roadMap';
import Popup from '@arcgis/core/widgets/Popup';
const clippingArea = new Extent({
  xmin: 21.201993,
  xmax: 21.258754,
  ymin: 45.720666,
  ymax: 45.777872,
});
const handler = (mapContainer: HTMLDivElement) =>
  new SceneView({
    clippingArea,
    viewingMode: 'local',
    map: map,
    container: mapContainer,
    camera: {
      position: {
        x: 21.226451243275225,
        y: 45.74,
        z: 100,
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
export default handler;
