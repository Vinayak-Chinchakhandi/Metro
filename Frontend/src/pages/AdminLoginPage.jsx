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

    <div className="min-h-screen flex items-center justify-center bg-red-950">

      <div className="bg-black text-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-red-500 mb-2 text-center">
          ☠ ADMIN ACCESS
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Restricted Area — Authorized Personnel Only
        </p>

        {error && (
          <p className="text-red-400 mb-4">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded ${
            loading
              ? "bg-gray-500"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Authenticating..." : "Login"}
        </button>

      </div>

    </div>

  );

}

export default AdminLoginPage;