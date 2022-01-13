import renderer from './renderer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Popup from '@arcgis/core/widgets/Popup';

export default new FeatureLayer({
  portalItem: {
    id: '3677599f43b9484aa01a0ee212beb410',
  },
  labelsVisible: false,
  opacity: 1,
  definitionExpression: 'osm_id = 152474227 OR osm_id = 194450516',
  renderer: renderer as unknown as undefined,
  popupTemplate: {
    content: 'AAAAAAAAAAAAA',
  },
});
