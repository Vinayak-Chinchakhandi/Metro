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

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // Set default time
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
            setError("Failed to load stations");

        } finally {

            setStationLoading(false);

        }

    };


    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");

        if (source === destination) {
            setError("Source and destination cannot be the same");
            return;
        }

        try {

            setLoading(true);

            const ticket = await bookTicket({
                source,
                destination,
                time
            });

            navigate("/ticket", { state: ticket });

        } catch (err) {

            console.error("Booking failed", err);

            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Booking failed. Please try again.");
            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="max-w-xl bg-white p-6 rounded shadow">

            <h2 className="text-2xl font-bold mb-6">
                Book Metro Ticket
            </h2>


            {error && (
                <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                    {error}
                </div>
            )}


            <form onSubmit={handleSubmit} className="flex flex-col gap-4">


                {/* Source Station */}
                <div>

                    <label className="block text-sm mb-1">
                        Source Station
                    </label>

                    <select
                        className="w-full border p-2 rounded"
                        value={source}
                        disabled={stationLoading}
                        onChange={(e) => {
                            setSource(e.target.value);
                            setDestination("");
                            setError("");
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

                    <label className="block text-sm mb-1">
                        Destination Station
                    </label>

                    <select
                        className="w-full border p-2 rounded"
                        value={destination}
                        disabled={!source || stationLoading}
                        onChange={(e) => {
                            setDestination(e.target.value);
                            setError("");
                        }}
                        required
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

                    <label className="block text-sm mb-1">
                        Travel Time
                    </label>

                    <input
                        type="time"
                        className="w-full border p-2 rounded"
                        value={time}
                        onChange={(e) => {
                            setTime(e.target.value);
                            setError("");
                        }}
                        required
                    />

                </div>



                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !source || !destination || !time}
                    className={`py-2 rounded text-white ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-700 hover:bg-blue-800"
                        }`}
                >

                    {loading ? "Booking..." : "Book Ticket"}

                </button>

            </form>

        </div>

    );

}

export default TicketForm;