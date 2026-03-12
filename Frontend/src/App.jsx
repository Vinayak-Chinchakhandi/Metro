import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import BookTicket from "./pages/BookTicket";
import TicketResult from "./pages/TicketResult";
import Dashboard from "./pages/Dashboard";
import FraudPage from "./pages/FraudPage";
import PredictionsPage from "./pages/PredictionsPage";
import StationsPage from "./pages/StationsPage";
import NetworkMap from "./pages/NetworkMap";
import EntryScan from "./pages/EntryScan";
import ExitScan from "./pages/ExitScan";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <Router>

      <Layout>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/book" element={<BookTicket />} />

          <Route path="/ticket" element={<TicketResult />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/fraud"
            element={
              <ProtectedRoute>
                <FraudPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/predictions"
            element={
              <ProtectedRoute>
                <PredictionsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/stations"
            element={
              <ProtectedRoute>
                <StationsPage />
              </ProtectedRoute>
            }
          />

          <Route path="/map" element={<NetworkMap />} />

          <Route path="/entry" element={<EntryScan />} />

          <Route path="/exit" element={<ExitScan />} />

        </Routes>

      </Layout>

    </Router>
  );
}

export default App;