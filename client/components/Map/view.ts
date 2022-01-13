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
export default (mapContainer: HTMLDivElement) =>
  new SceneView({
    clippingArea,
    viewingMode: 'local',
    map: map,
    container: mapContainer,
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
