import React, { Component } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { Map, TileLayer, Popup, Marker, LatLng } from "react-leaflet";
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

    const markers = []; //MARKERS es el Array de distintos marker

    function compareMarkers(marker1, marker2) {
      //Compara dos markers y devuelve true si son iguales
      const positionMarker1 = marker1.getLatLng();
      const positionMarker2 = marker2.getLatLng();
      return (
        positionMarker1.lat === positionMarker2.lat &&
        positionMarker1.lng === positionMarker2.lng
      );
    }

    function findMarker(marker) {
      //Comparar el Array hasta encontrar elemento
      for (let i = markers.length - 1; i >= 0; i--) {
        if (compareMarkers(markers[i], marker)) {
          return i;
        }
      }
      return null;
    }
    // Función de hacer click en el mapa
    map.on("click", (e) => {
      new ELG.ReverseGeocode().latlng(e.latlng).run((error, result) => {
        if (error) {
          return;
        }

        const marker = L.marker(result.latlng).addTo(map);
        marker.bindPopup(result.address.Match_addr).openPopup();
        marker.on("click", (clickEvent) => {
          //Función de hacer click en un marker para borrarlo del Array MARKERS y del mapa
          const positionArray = findMarker(marker);
          if (positionArray != null) {
            markers.splice(positionArray, 1); // SPLICE Elimina el marker del Array
          }

          marker.remove(); //REMOVE Elimina el marker del Mapa
        });
        markers.push(marker); // PUSH Añade el marker al Array
        console.log(markers);
        console.log(result.latlng);
      });
    });
    // Función de búsqueda en el mapa
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
        <Marker position={[41.390205, 2.154007]}>
          <Popup>Marker 1</Popup>
        </Marker>
        <Marker position={[43.4883, -8.22275]}>
          <Popup>Marker 2</Popup>
        </Marker>

        <div className="pointer" />
      </Map>
    );
  }
}

export default MapComp;
