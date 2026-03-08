import { NavLink } from "react-router-dom";

function Navbar() {

  const baseLink =
    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200";

  const activeLink =
    "bg-white text-blue-700 shadow";

  const normalLink =
    "text-white hover:bg-blue-600";

  return (
    <nav className="bg-blue-700 shadow-md">

      <div className="max-w-7xl mx-auto px-8">

        <div className="flex items-center justify-between h-16">

          {/* LOGO */}

          <div className="flex items-center space-x-2 text-white font-bold text-xl">
            <span className="text-2xl">🚇</span>
            <span>MetroMind AI</span>
          </div>

          {/* NAV LINKS */}

          <div className="flex items-center space-x-6">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : normalLink}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/book"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : normalLink}`
              }
            >
              Book Ticket
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : normalLink}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/map"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : normalLink}`
              }
            >
              Metro Map
            </NavLink>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;