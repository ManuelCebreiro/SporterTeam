import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapLocalization = () => {
  const { store, actions } = useContext(Context);
  return (
    <MapContainer center={[store.lat, store.lng]} zoom={11}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[store.lat, store.lng]}>
        <Popup>Tu posicion actual</Popup>
      </Marker>
    </MapContainer>
  );
};
