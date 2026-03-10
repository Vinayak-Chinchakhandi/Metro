import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import metroStations from "../maps/metroStations";
import "leaflet/dist/leaflet.css";

function NetworkMap() {

  const center = [12.9716, 77.5946]; // Bangalore center

  /*
  ----------------------------------------
  GROUP STATIONS BY LINE
  ----------------------------------------
  */

  const lines = {};

  metroStations.forEach((station) => {

    if (!lines[station.line]) {
      lines[station.line] = [];
    }

    lines[station.line].push(station);

  });

  /*
  ----------------------------------------
  SORT STATIONS BY SEQUENCE
  ----------------------------------------
  */

  Object.keys(lines).forEach((line) => {
    lines[line].sort((a, b) => a.sequence - b.sequence);
  });

  /*
  ----------------------------------------
  LINE COLORS
  ----------------------------------------
  */

  const getLineColor = (line) => {

    const l = line.toLowerCase();

    if (l.includes("purple")) return "purple";
    if (l.includes("green")) return "green";
    if (l.includes("yellow")) return "gold";

    return "blue";

  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Bangalore Metro Network
      </h1>

      <div className="h-[650px] rounded overflow-hidden">

        <MapContainer
          center={center}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* DRAW METRO LINES */}

          {Object.keys(lines).map((line) => {

            const positions = lines[line]
              .filter(s => s.latitude && s.longitude)
              .map((s) => [
                Number(s.latitude),
                Number(s.longitude)
              ]);

            if (positions.length < 2) return null;

            return (

              <Polyline
                key={line}
                positions={positions}
                color={getLineColor(line)}
                weight={5}
              />

            );

          })}

          {/* STATION MARKERS */}

          {metroStations.map((station) => (

            <Marker
              key={station.code}
              position={[
                Number(station.latitude),
                Number(station.longitude)
              ]}
            >

              <Popup>

                <strong>{station.name}</strong>

                <br />

                Line: {station.line}

                <br />

                Station Code: {station.code}

                <br />

                Sequence: {station.sequence}

                <br />

                {station.is_interchange
                  ? "🔴 Interchange Station"
                  : "Regular Station"
                }

              </Popup>

            </Marker>

          ))}

        </MapContainer>

      </div>

    </div>

  );

}

export default NetworkMap;