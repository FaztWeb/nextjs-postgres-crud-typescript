import Map from '@arcgis/core/Map';
import buildingsLayer from './featureLayer';
export default new Map({
  basemap: 'osm',
  layers: [buildingsLayer],
});
