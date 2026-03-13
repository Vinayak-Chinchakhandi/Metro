function Navbar() {
  return (
    <div className="w-full bg-indigo-700 text-indigo-100 px-8 py-4 flex justify-between items-center shadow-md">

      <h2 className="text-lg font-semibold tracking-wide hover:text-white transition duration-200">
        Metro AI Ticketing System
      </h2>

      <div className="flex items-center gap-2 text-sm text-green-300 font-medium">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        System Online
      </div>

    </div>
  );
}

export default Navbar;