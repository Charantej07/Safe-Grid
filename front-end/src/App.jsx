import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LiveFeed from "./pages/LiveFeed";
import IncidentLogs from "./pages/IncidentLogs";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const userRole = useSelector((state) => state.auth.user?.role);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["admin", "security", "user"]} />} />
        <Route path="/live-feed" element={<ProtectedRoute element={<LiveFeed />} allowedRoles={["admin", "security"]} />} />
        <Route path="/incident-logs" element={<ProtectedRoute element={<IncidentLogs />} allowedRoles={["admin", "security"]} />} />
      </Routes>
    </Router>
  );
}

export default App;
