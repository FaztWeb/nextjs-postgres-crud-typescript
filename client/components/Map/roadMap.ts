import Map from '@arcgis/core/Map';
import buildingsLayer from './3DLayer';
export default new Map({
  basemap: 'osm',
  layers: [buildingsLayer],
});
