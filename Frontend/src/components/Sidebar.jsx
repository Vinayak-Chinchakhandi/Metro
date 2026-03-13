import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menu = [
        { name: "Home", path: "/", icon: "🏠" },
        { name: "Book Ticket", path: "/book", icon: "🎫" },
        { name: "Network Map", path: "/map", icon: "🗺️" },
        { name: "Entry Scan", path: "/entry", icon: "📷" },
        { name: "Exit Scan", path: "/exit", icon: "🚪" },
    ];

    return (
        <div className="w-64 h-screen bg-indigo-900 text-indigo-100 fixed left-0 top-0 p-6 shadow-lg">

            <h1 className="text-2xl font-bold mb-10 tracking-wide">
                Metro AI
            </h1>

            <div className="flex flex-col gap-2">

                {menu.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200
                        ${
                            location.pathname === item.path
                                ? "bg-indigo-500 text-white shadow"
                                : "hover:bg-indigo-800 hover:translate-x-1"
                        }`}
                    >
                        <span>{item.icon}</span>
                        {item.name}
                    </Link>
                ))}

            </div>
        </div>
    );
}

export default Sidebar;