import { useEffect, useState } from "react";
import { getStations } from "../services/ticketService";
import { usePredictions } from "../hooks/usePredictions";
import StationCard from "./StationCard";

function Stations() {

  const [stations, setStations] = useState([]);
  const predictions = usePredictions();

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {

    try {

      const data = await getStations();
      setStations(data);

    } catch (err) {

      console.error("Error fetching stations", err);

    }

  };

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {stations.map((station) => {

        const prediction = predictions.find(
          (p) => p.station === station.name
        );

        return (
          <StationCard
            key={station.code}
            station={station}
            prediction={prediction}
          />
        );

      })}

    </div>

  );

}

export default Stations;