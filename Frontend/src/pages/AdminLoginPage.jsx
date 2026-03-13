import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/adminService";

function AdminLoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

        <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-black via-red-950 to-black relative">

            {/* EXIT BUTTON */}

            <button
                onClick={() => navigate("/")}
                className="absolute top-6 right-6 text-red-500 text-3xl 
  hover:text-red-300 transition"
            >
                ✕
            </button>


            {/* LOGIN CARD */}

            <div className="bg-black/90 backdrop-blur-lg text-white 
      p-10 rounded-2xl 
      shadow-[0_0_50px_rgba(255,0,0,0.6)] 
      w-96 border border-red-700">

                <h1 className="text-3xl font-bold text-red-500 text-center mb-2 animate-pulse">
                    ☠ ADMIN ACCESS
                </h1>

                <p className="text-gray-400 text-center mb-6 text-sm tracking-wide">
                    Restricted Area — Authorized Personnel Only
                </p>

                {error && (
                    <p className="text-red-400 mb-4 text-center">{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 mb-4 rounded-lg 
          bg-black border border-gray-700 
          focus:border-red-500 focus:outline-none 
          text-white placeholder-gray-500 transition"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-5 rounded-lg 
          bg-black border border-gray-700 
          focus:border-red-500 focus:outline-none 
          text-white placeholder-gray-500 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-semibold transition
          ${loading
                            ? "bg-gray-700 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(255,0,0,0.8)]"
                        }`}
                >
                    {loading ? "Authenticating..." : "ACCESS SYSTEM"}
                </button>

            </div>

        </div>

    );

}

export default AdminLoginPage;