import renderer from './renderer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

const featureLayer = new FeatureLayer({
  portalItem: {
    id: '3677599f43b9484aa01a0ee212beb410',
  },
  labelsVisible: false,
  opacity: 1,
  definitionExpression: 'osm_id = 152474227 OR osm_id = 194450516',
  renderer: renderer as unknown as undefined,
});

const query = featureLayer.createQuery();
query.where = 'osm_id = 152474227 OR osm_id = 194450516';
query.returnGeometry = true;

export const chruches = featureLayer.queryFeatures(query).then((response) => {
  return response.features.map((church) => {
    return {
      name: church.attributes.name as string,
      lat: church.geometry.centroid.latitude as number,
      long: church.geometry.centroid.longitude as number,
    };
  });
});

export default featureLayer;
