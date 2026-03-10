import { useState } from "react";
import FraudAlerts from "../components/FraudAlerts";
import Predictions from "../components/Predictions";
import Stations from "../components/Stations";

function Dashboard() {

    const [activeTab, setActiveTab] = useState("fraud");

    const handleLogout = () => {

        localStorage.removeItem("adminAuth");

        window.location.href = "/";

    };

    return (

        <div className="p-8">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>

            </div>

            {/* Menu */}

            <div className="flex gap-4 mb-8">

                <button
                    onClick={() => setActiveTab("fraud")}
                    className={`px-4 py-2 rounded ${activeTab === "fraud"
                        ? "bg-red-600 text-white"
                        : "bg-gray-200"
                        }`}
                >
                    Fraud Alerts
                </button>

                <button
                    onClick={() => setActiveTab("predictions")}
                    className={`px-4 py-2 rounded ${activeTab === "predictions"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                        }`}
                >
                    Predictions
                </button>

                <button
                    onClick={() => setActiveTab("stations")}
                    className={`px-4 py-2 rounded ${activeTab === "stations"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200"
                        }`}
                >
                    Stations
                </button>

            </div>


            {/* Content */}

            {activeTab === "fraud" && <FraudAlerts />}

            {activeTab === "predictions" && <Predictions />}

            {activeTab === "stations" && <Stations />}

        </div>

    );

}

export default Dashboard;