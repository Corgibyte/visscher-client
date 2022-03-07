import React, { useRef, useState, useEffect } from 'react';
import * as ol from 'ol';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';

const mapStyle = {
  minWidth: "600px",
  minHeight: "600px",
  width: "100%",
  height: "500px"
};

function Map() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    let options = {
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ]
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  return (
    <div ref={mapRef} style={mapStyle}></div>
  );
}

export default Map;