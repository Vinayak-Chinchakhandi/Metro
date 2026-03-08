import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import BookTicket from "./pages/BookTicket";
import TicketResult from "./pages/TicketResult";
import Dashboard from "./pages/Dashboard";
import NetworkMap from "./pages/NetworkMap";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookTicket />} />
        <Route path="/ticket" element={<TicketResult />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<NetworkMap />} />
      </Routes>

    </Router>
  );
}

export default App;