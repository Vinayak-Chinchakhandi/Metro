import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menu = [
        { name: "Home", path: "/" },
        { name: "Book Ticket", path: "/book" },
        { name: "Network Map", path: "/map" },
        { name: "Entry Scan", path: "/entry" },
        { name: "Exit Scan", path: "/exit" },
    ];

    return (
        <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 p-6">

            <h1 className="text-2xl font-bold mb-10">
                Metro AI
            </h1>

            <div className="flex flex-col gap-4">

                {menu.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`p-2 rounded ${location.pathname === item.path
                                ? "bg-blue-600"
                                : "hover:bg-slate-700"
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}

            </div>
        </div>
    );
}

export default Sidebar;