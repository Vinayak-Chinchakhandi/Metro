import { useNavigate } from "react-router-dom";
import Stations from "../components/Stations";

function StationsPage() {

  const navigate = useNavigate();

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Station Monitoring
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Back
        </button>

      </div>

      <Stations />

    </div>
  );
}

export default StationsPage;
