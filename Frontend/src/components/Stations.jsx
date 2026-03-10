import { useEffect, useState } from "react";
import { getStations } from "../services/ticketService";
import StationCard from "./StationCard";

function Stations() {

  const [stations, setStations] = useState([]);

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

      {stations.map((station) => (
        <StationCard key={station.code} station={station} />
      ))}

    </div>

  );

}

export default Stations;