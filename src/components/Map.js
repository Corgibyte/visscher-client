import React, { useRef, useState, useEffect } from 'react';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Fill, Style, Text, Stroke, Circle } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import * as ol from 'ol';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';

const mapStyle = {
  minWidth: "600px",
  minHeight: "600px",
  width: "100%",
  height: "500px"
};

const textStyle = (feature) => {
  return new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({ color: 'rgba(255, 0, 0, 0.1)' }),
      stroke: new Stroke({ color: 'red', width: 1 })
    }),
    text: new Text({
      font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
      placement: 'point',
      fill: new Fill({
        color: 'black',
      }),
      text: feature.get('name')
    }),
  });
}

function Map() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isLoading, toggleLoading] = useState(true);
  const [error, toggleError] = useState(false);

  useEffect(() => {
    // API Helper
    const runFetch = async () => {
      fetch('http://localhost:5000/api/Battles?startYear=9999&endYear=9999')
        .then(response => response.json())
        .then(
          (jsonifiedResponse) => {
            createMap(jsonifiedResponse);
            toggleLoading(false);
          })
        .catch((error) => {
          toggleError(true);
        });
    }
    const createMap = (jsonData) => {
      var features = jsonData.map(x => new Feature({
        geometry: new Point(fromLonLat(x.coordinates)),
        name: x.Name
      }));
      const vectorSource = new VectorSource();
      vectorSource.addFeatures(features);
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: textStyle,
        declutter: true
      });

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
          }),
          vectorLayer
        ]
      };
      let mapObject = new ol.Map(options);
      mapObject.setTarget(mapRef.current);
      setMap(mapObject);
    }
    runFetch();
    return () => map.setTarget(undefined);
  }, []);

  const chooseRender = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    } else if (error) {
      return <p>Error!</p>
    }
  }

  return (
    <div ref={mapRef} style={mapStyle}>
      {chooseRender()}
    </div>
  );
}

export default Map;