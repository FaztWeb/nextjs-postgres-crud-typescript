export default {
  type: 'simple', // autocasts as new SimpleRenderer()
  symbol: {
    type: 'polygon-3d', // autocasts as new PolygonSymbol3D()
    symbolLayers: [
      { type: 'extrude', material: { color: 'orange' }, size: 30 },
    ], // autocasts as new ExtrudeSymbol3DLayer()
  },
};
