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
import Form from './Form';

const mapStyle = {
  minWidth: "600px",
  width: "100%",
  minHeight: "700px",
  height: "700px",
  border: "solid black 1px",
};

const loadStyle = {
  fontSize: "60px",
  textAlign: "center"
}

const textStyle = (feature, resolution) => {
  const colorCode = feature.get('EventId') >= 5000 ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 0, 255, 0.1)';
  const color = feature.get('EventId') >= 5000 ? 'red' : 'blue';
  return new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({ color: colorCode }),
      stroke: new Stroke({ color: color, width: 1 })
    }),
    text: new Text({
      font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
      placement: 'point',
      fill: new Fill({
        color: 'black',
      }),
      offsetY: -15,
      text: feature.get('name'),
      overflow: true
    }),
  });
}

function Map() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isLoading, toggleLoading] = useState(true);
  const [error, toggleError] = useState(false);
  const [startYear, setStartYear] = useState(1444);
  const [endYear, setEndYear] = useState(1812);
  const [declutter, setDeclutter] = useState(false);
  const [view, setView] = useState(new ol.View({ center: [0, 0], zoom: 2 }));
  const [showBattles, setBattleShow] = useState(true);
  const [showEarthquakes, setEarthquakeShow] = useState(true);

  const formCallback = (startYear, endYear, declutter, showBattles, showEarthquakes) => {
    setStartYear(startYear);
    setEndYear(endYear);
    setDeclutter(declutter);
    setBattleShow(showBattles);
    setEarthquakeShow(showEarthquakes);
    map.setTarget(null);
    setMap(null);
    toggleLoading(true);
  }

  useEffect(() => {
    const mapData = [];
    // API Helper
    const runFetch = async (category) => {
      return fetch(`https://visscherapi.azurewebsites.net/api/${category}?startYear=${startYear}&endYear=${endYear}`)
        .then((response) => {
          return response.json();
        })
        .then(
          (jsonifiedResponse) => {
            return jsonifiedResponse;
          })
        .catch((error) => {
          toggleError(true);
        });
    }
    const createMap = (jsonData) => {
      var features = jsonData.map(x => new Feature({
        geometry: new Point(fromLonLat(x.coordinates)),
        name: x.Name,
        EventId: x.EventId
      }));
      const vectorSource = new VectorSource();
      vectorSource.addFeatures(features);
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: textStyle,
        declutter: declutter
      });

      let options = {
        view: view,
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
    if (map == null) {
      let mapData = [];
      runFetch("Battles").then((result) => {
        if (showBattles) {
          mapData = [...result];
        }
        runFetch("Earthquakes").then((result) => {
          if (showEarthquakes) {
            mapData = [...mapData, ...result];
          }
          toggleLoading(false);
          createMap(mapData);
        });
      });
    }
  }, [map, startYear, endYear]);

  const chooseRender = () => {
    if (isLoading) {
      return <p style={loadStyle}>Loading...</p>;
    } else if (error) {
      return <p>Error!</p>
    }
  }

  return (
    <React.Fragment>
      <div ref={mapRef} style={mapStyle} className="ol-layer">
        {chooseRender()}
      </div>
      <Form formCallback={formCallback}
        startYear={startYear}
        endYear={endYear}
        declutter={declutter}
        showBattles={showBattles}
        showEarthquakes={showEarthquakes} />
    </React.Fragment>
  );
}

export default Map;