import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStations, bookTicket } from "../services/ticketService";

function TicketForm() {

    const navigate = useNavigate();

    const [stations, setStations] = useState([]);
    const [stationLoading, setStationLoading] = useState(true);

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [time, setTime] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        setTime(`${hours}:${minutes}`);
    }, []);

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {

        try {

            const data = await getStations();
            setStations(data);

        } catch (err) {

            console.error("Error loading stations", err);
            setMessage("Failed to load stations");
            setMessageType("error");

        } finally {

            setStationLoading(false);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage("");

        if (!source) {
            setMessage("Please select source station");
            setMessageType("error");
            return;
        }

        if (!destination) {
            setMessage("Please select destination station");
            setMessageType("error");
            return;
        }

        if (source === destination) {
            setMessage("Source and destination cannot be the same");
            setMessageType("error");
            return;
        }

        try {

            setLoading(true);

            const ticket = await bookTicket({
                source,
                destination,
                time
            });

            setMessage("Ticket booked successfully");
            setMessageType("success");

            navigate("/ticket", { state: ticket });

        } catch (err) {

            console.error("Booking failed", err);

            if (err.response?.data?.error) {
                setMessage(err.response.data.error);
                setMessageType("error");
            } else {
                setMessage("Booking failed. Please try again.");
                setMessageType("error");
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-xl bg-white p-8 rounded-xl shadow-sm border border-indigo-100">

            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Book Metro Ticket
            </h2>

            {message && (
                <div
                    className={`p-3 mb-5 rounded text-sm font-medium ${
                        messageType === "error"
                            ? "bg-red-100 text-red-700"
                            : messageType === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Source Station */}
                <div>

                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Source Station
                    </label>

                    <select
                        className="w-full border border-indigo-100 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={source}
                        disabled={stationLoading}
                        onChange={(e) => {
                            setSource(e.target.value);
                            setDestination("");
                            setMessage("");
                        }}
                        required
                    >

                        <option value="">
                            {stationLoading ? "Loading stations..." : "Select Source"}
                        </option>

                        {stations.map((station) => (
                            <option key={station.name} value={station.name}>
                                {station.name} ({station.line})
                            </option>
                        ))}

                    </select>

                </div>


                {/* Destination Station */}
                <div>

                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Destination Station
                    </label>

                    <select
                        className={`w-full border border-indigo-100 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            !source ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                        value={destination}
                        disabled={stationLoading}
                        onMouseDown={(e) => {
                            if (!source) {
                                e.preventDefault();
                                setMessage("Please select source station first");
                                setMessageType("error");
                            }
                        }}
                        onChange={(e) => {
                            setDestination(e.target.value);
                            setMessage("");
                        }}
                    >

                        <option value="">
                            {stationLoading ? "Loading stations..." : "Select Destination"}
                        </option>

                        {stations
                            .filter((station) => station.name !== source)
                            .map((station) => (
                                <option key={station.name} value={station.name}>
                                    {station.name} ({station.line})
                                </option>
                            ))}

                    </select>

                </div>


                {/* Travel Time */}
                <div>

                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Travel Time
                    </label>

                    <input
                        type="time"
                        className="w-full border border-indigo-100 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={time}
                        onChange={(e) => {
                            setTime(e.target.value);
                            setMessage("");
                        }}
                        required
                    />

                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`py-2.5 rounded-lg text-white font-medium transition ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >

                    {loading ? "Booking..." : "Book Ticket"}

                </button>

            </form>

        </div>

    );

}

export default TicketForm;