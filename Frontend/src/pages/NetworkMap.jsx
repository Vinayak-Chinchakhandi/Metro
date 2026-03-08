import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import metroStations from "../maps/metroStations";

function NetworkMap() {

  return (
    <div className="container">

      <h2>Metro Network Map</h2>

      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={12}
        style={{ height: "500px" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {metroStations.map((s, i) => (
          <Marker key={i} position={[s.lat, s.lng]}>
            <Popup>{s.name}</Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  );
}

export default NetworkMap;