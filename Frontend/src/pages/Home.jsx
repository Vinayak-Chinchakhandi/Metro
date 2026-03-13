import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="p-8">

            <div className="max-w-6xl mx-auto">

                {/* HEADER */}

                <div className="mb-12">

                    <h1 className="text-3xl font-semibold text-slate-800">
                        Metro AI Ticketing System
                    </h1>

                    <p className="text-slate-600 mt-2 max-w-xl">
                        AI-powered smart metro ticketing platform with QR access,
                        demand prediction and fraud detection.
                    </p>

                </div>


                {/* MAIN CARDS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                    {/* BOOK TICKET */}

                    <div
                        onClick={() => navigate("/book")}
                        className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100
                        hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
                    >

                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            🎫 Book Ticket
                        </h2>

                        <p className="text-slate-600 text-sm">
                            Generate QR-based metro tickets with AI crowd prediction.
                        </p>

                    </div>


                    {/* NETWORK MAP */}

                    <div
                        onClick={() => navigate("/map")}
                        className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100
                        hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
                    >

                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            🗺 Metro Network
                        </h2>

                        <p className="text-slate-600 text-sm">
                            Visualize metro stations and network connections.
                        </p>

                    </div>


                    {/* ADMIN DASHBOARD */}

                    <div
                        onClick={() => navigate("/admin/login")}
                        className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100
                        hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
                    >

                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            🛠 Admin Dashboard
                        </h2>

                        <p className="text-slate-600 text-sm">
                            View fraud alerts, AI predictions and metro analytics.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Home;