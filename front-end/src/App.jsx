import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LiveFeed from "./pages/LiveFeed";
import IncidentLogs from "./pages/IncidentLogs";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {isAuthenticated && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live-feed" element={<LiveFeed />} />
            <Route path="/incident-logs" element={<IncidentLogs />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;