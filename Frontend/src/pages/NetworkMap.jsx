import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from "react-leaflet";
import metroStations from "../maps/metroStations";
import "leaflet/dist/leaflet.css";
import { usePredictions } from "../hooks/usePredictions";
import L from "leaflet";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function NetworkMap() {

  const center = [12.9716, 77.5946]; // Bangalore center

  const predictions = usePredictions();

  const lines = {};

  metroStations.forEach((station) => {
    if (!lines[station.line]) {
      lines[station.line] = [];
    }
    lines[station.line].push(station);
  });

  Object.keys(lines).forEach((line) => {
    lines[line].sort((a, b) => a.sequence - b.sequence);
  });

  const getLineColor = (line) => {

    const l = line.toLowerCase();

    if (l.includes("purple")) return "purple";
    if (l.includes("green")) return "green";
    if (l.includes("yellow")) return "gold";

    return "blue";
  };

  const getStationColor = (stationName) => {

    const prediction = predictions.find(
      (p) => p.station === stationName
    );

    if (!prediction) return "blue";

    if (prediction.crowd_level === "Low") return "green";
    if (prediction.crowd_level === "Medium") return "orange";
    if (prediction.crowd_level === "High") return "red";

    return "blue";
  };

  const getStationIcon = (stationName) => {

    const prediction = predictions.find(
      (p) => p.station === stationName
    );

    let iconUrl =
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png";

    if (prediction) {

      if (prediction.crowd_level === "Medium")
        iconUrl =
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png";

      if (prediction.crowd_level === "High")
        iconUrl =
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";

    }

    return new L.Icon({
      iconUrl,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

  };

  return (

    <div className="p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-6">

          <h1 className="text-3xl font-semibold text-slate-800">
            Bangalore Metro Network
          </h1>

          <p className="text-slate-600 mt-1">
            Visualize metro routes and live station crowd predictions.
          </p>

        </div>

        {/* LEGEND */}

        <div className="flex gap-6 mb-4 text-sm">

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Low Crowd
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
            Medium Crowd
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            High Crowd
          </div>

        </div>

        {/* MAP CARD */}

        <div className="h-[650px] rounded-xl overflow-hidden shadow-md border border-indigo-100">

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

            {metroStations.map((station) => {

              const color = getStationColor(station.name);

              return (

                <>

                  <CircleMarker
                    key={`circle-${station.code}-${station.sequence}`}
                    center={[
                      Number(station.latitude),
                      Number(station.longitude)
                    ]}
                    radius={32}
                    pathOptions={{
                      fillColor:
                        color === "red"
                          ? "#ff6b6b"
                          : color === "orange"
                            ? "#ffd166"
                            : "#6bcf7f",
                      fillOpacity: 0.35,
                      stroke: false
                    }}
                  />

                  <Marker
                    key={`${station.code}-${station.sequence}`}
                    position={[
                      Number(station.latitude),
                      Number(station.longitude)
                    ]}
                    icon={getStationIcon(station.name)}
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

                      <br /><br />

                      {(() => {

                        const prediction = predictions.find(
                          (p) => p.station === station.name
                        );

                        if (!prediction) {
                          return "No prediction data";
                        }

                        return (
                          <>
                            <strong>Current Load:</strong> {prediction.current_station_load}
                            <br />
                            <strong>Crowd Level:</strong> {prediction.crowd_level}
                          </>
                        );

                      })()}

                    </Popup>

                  </Marker>

                </>

              );

            })}

          </MapContainer>

        </div>

      </div>

    </div>

  );

}

export default NetworkMap;