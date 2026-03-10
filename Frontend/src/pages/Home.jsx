import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { adminLogin } from "../services/adminService";

function Home() {

    const navigate = useNavigate();
    const [showAuth, setShowAuth] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAdminAccess = () => {
        setShowAuth(true);
    };

    const handleLogin = async () => {

        setError("");

        if (!username || !password) {
            setError("Username and password required");
            return;
        }

        try {

            setLoading(true);

            const res = await adminLogin({
                username,
                password
            });

            if (res.message === "Login successful") {

                localStorage.setItem("adminAuth", "true");

                setShowAuth(false);

                navigate("/dashboard");

            }

        } catch (err) {

            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Login failed");
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="p-8">

            {/* Title */}
            <div className="mb-10">

                <h1 className="text-3xl font-bold text-gray-800">
                    Metro AI Ticketing System
                </h1>

                <p className="text-gray-600 mt-2">
                    AI-powered smart metro ticketing platform with QR access,
                    demand prediction and fraud detection.
                </p>

            </div>


            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                {/* Book Ticket */}
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



                {/* Network Map */}
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



                {/* Admin Dashboard */}
                <div
                    onClick={handleAdminAccess}
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


            {/* Admin Authentication Modal */}
            {showAuth && (

                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

                    <div className="relative bg-white p-6 rounded shadow w-80">

                        <button
                            onClick={() => setShowAuth(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-bold mb-4 text-red-600">
                            Restricted Access
                        </h2>

                        <p className="text-sm mb-4">
                            Admin authentication required
                        </p>

                        {error && (
                            <p className="text-red-500 mb-2">{error}</p>
                        )}

                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full border p-2 mb-3"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 mb-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
                                }`}
                        >
                            {loading ? "Authenticating..." : "Login"}
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Home;