import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainStyle } from "../styles/style";
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point";
import { useGeographic } from "ol/proj";
import Feature from "ol/Feature";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import View from "ol/View";
import Circle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Style from "ol/style/Style";

const MapContainer = styled.div`
  margin-top: ${MainStyle.space.l}px;
  width: 100%;
  height: 200px;

  .ol-viewport {
    border-radius: ${MainStyle.radius.s}px;
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
