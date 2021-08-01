import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainStyle } from "../styles/style";

const MapContainer = styled.div`
  margin-top: ${MainStyle.space.l}px;
  width: 100%;
  height: 200px;

  canvas {
    border-radius: ${MainStyle.radius.m}px;
  }
`;

export default function MapBlock({ location, ...props }) {
  useEffect(() => {
    if (location) {
      reqMapCoord(location);
    }
  }, [location]);

  const [foundLocation, setFoundLocation] = useState(false);

  const reqMapCoord = (cityName) => {
    fetch(
      `https://api-adresse.data.gouv.fr/search/?q=%20=${cityName}&type=municipality&autocomplete=1&limit=1`
    )
      .then((response) => response.json())
      .then((data) => {
        //If there is a result
        if (data.features.length > 0) {
          const long = data.features[0].geometry.coordinates[0];
          const lat = data.features[0].geometry.coordinates[1];
          setFoundLocation(true);
          initMap(long, lat);
        }
      });
  };

  const initMap = (long, lat) => {
    const Map = require("ol/Map").default;
    const OSM = require("ol/source/OSM").default;
    const TileLayer = require("ol/layer/Tile").default;
    //const VectorSource = require("ol/source/Vector").default;
    const VectorLayer = require("ol/layer/Vector").default;
    const ImageLayer = require("ol/layer/Image").default;
    const Static = require("ol/source/ImageStatic").default;
    const View = require("ol/View").default;
    const Projection = require("ol/proj/Projection").default;
    const Circle = require("ol/style/Circle").default;
    const Fill = require("ol/style/Fill").default;
    const Style = require("ol/style/Style").default;
    const VectorSource = require("ol/source/Vector").default;
    const Point = require("ol/geom/Point").default;
    const useGeographic = require("ol/proj").useGeographic;
    const Feature = require("ol/Feature").default;
    useGeographic();

    const place = [long, lat];

    var point = new Point(place);

    new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(point)]
          }),
          style: new Style({
            image: new Circle({
              radius: 8,
              fill: new Fill({ color: "#146cda" })
            })
          })
        })
      ],
      view: new View({
        center: place,
        zoom: 11
      }),
      controls: []
    });
  };

  return <div>{foundLocation && <MapContainer id="map" className="mt-4"></MapContainer>}</div>;
}
