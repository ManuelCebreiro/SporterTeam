import React from "react";
import ReactDOM from "react-dom";

import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

import Map from "./Map";

export const MapaField = () => {
  return (
    <div className="container py-5">
      <div className="Map">
        <Map />
      </div>
    </div>
  );
};
