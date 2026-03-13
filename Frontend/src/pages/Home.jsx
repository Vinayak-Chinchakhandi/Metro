import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="p-8">

      <div className="mb-10">

        <h1 className="text-3xl font-bold text-gray-800">
          Metro AI Ticketing System
        </h1>

        <p className="text-gray-600 mt-2">
          AI-powered smart metro ticketing platform with QR access,
          demand prediction and fraud detection.
        </p>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/book")}
          className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer"
        >

          <h2 className="text-xl font-bold mb-2">
            🎫 Book Ticket
          </h2>

          <p className="text-gray-600">
            Generate QR-based metro tickets with AI crowd prediction.
          </p>

        </div>


        <div
          onClick={() => navigate("/map")}
          className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer"
        >

          <h2 className="text-xl font-bold mb-2">
            🗺 Metro Network
          </h2>

          <p className="text-gray-600">
            Visualize metro stations and network connections.
          </p>

        </div>


        <div
          onClick={() => navigate("/admin/login")}
          className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer"
        >

          <h2 className="text-xl font-bold mb-2">
            🛠 Admin Dashboard
          </h2>

          <p className="text-gray-600">
            View fraud alerts, AI predictions and metro analytics.
          </p>

        </div>

      </div>

    </div>

  );

}

export default Home;