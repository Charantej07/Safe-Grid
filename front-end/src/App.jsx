import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LiveFeed from "./pages/LiveFeed";
import IncidentLogs from "./pages/IncidentLogs";
import Home from "./pages/Home";

function ProtectedRoute({ element }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/live-feed" element={<ProtectedRoute element={<LiveFeed />} />} />
        <Route path="/incident-logs" element={<ProtectedRoute element={<IncidentLogs />} />} />
      </Routes>
    </Router>
  );
}

export default App;
