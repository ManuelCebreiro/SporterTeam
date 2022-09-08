import React, { Component } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { Map, TileLayer } from "react-leaflet";
import "./Map.css";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
});

class MapComp extends Component {
  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    map.on("click", (e) => {
      new ELG.ReverseGeocode().latlng(e.latlng).run((error, result) => {
        if (error) {
          return;
        }
        if (this.marker && map.hasLayer(this.marker))
          map.removeLayer(this.marker);

        this.marker = L.marker(result.latlng).addTo(map);
        bindPopup(result.address.Match_addr);
        openPopup();
      });
    });

    searchControl.on("results", function (data) {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });
  }

  render() {
    const center = [40.4167, -3.7037];
    return (
      <Map
        style={{ height: "100vh" }}
        center={center}
        zoom="6"
        ref={(m) => {
          this.leafletMap = m;
        }}
      >
        <TileLayer
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />
        <div className="pointer" />
      </Map>
    );
  }
}

export default MapComp;
