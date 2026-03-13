import { useEffect, useState } from "react";
import { getStations } from "../services/ticketService";
import { usePredictions } from "../hooks/usePredictions";
import StationCard from "./StationCard";

function Stations({ search }) {

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

  const filteredStations = stations
    .filter((station) =>
      station.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {

      const aMatch = a.name.toLowerCase().startsWith(search.toLowerCase());
      const bMatch = b.name.toLowerCase().startsWith(search.toLowerCase());

      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;

      return 0;

    });

  return (

    <div>

      {filteredStations.length === 0 && (

        <div className="bg-white border border-indigo-100 rounded-xl p-6 text-center shadow-sm">

          <p className="text-slate-600 font-medium">
            No stations match your search
          </p>

        </div>

      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredStations.map((station) => {

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

    </div>

  );

}

export default Stations;