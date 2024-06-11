import React, { useState, useEffect, useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import HealthLayout from "./Layout/HealthLayout";
import HealthLogin from "./components/Form/HealthLogin";
import HealthRegisterForm from "./components/Form/HealthRegisterForm";
import ProtectedRoute from "./Layout/ProtectedRoute";
import UnprotectedRoute from "./Layout/UnProtectedRoute";
import { UserContext } from "./UserContext";

function App() {
  const [healthChecks, setHealthChecks] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const fetchHealthChecks = async () => {
    try {
      const response = await axios.get("http://localhost:9000/health");
      const allData = response.data;

      setHealthChecks(
        allData.map((item) => ({
          key: item.id,
          email: item.email,
          hostName: item.host_name,
          timestamp: formatTimestamp(item.timestamp),
          status: item.status,
          responseTime: item.response_time,
          cpuUsage: item.cpu_usage,
          memoryUsage: item.memory_usage,
        }))
      );
    } catch (error) {
      console.error("Error fetching health checks:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  useEffect(() => {
    fetchHealthChecks();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/login"
          element={
            <UnprotectedRoute>
              <HealthLogin
                fetchHealthChecks={fetchHealthChecks}
                setUser={setUser}
              />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/auth/register"
          element={
            <UnprotectedRoute>
              <HealthRegisterForm fetchHealthChecks={fetchHealthChecks} />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/health/*"
          element={
            <ProtectedRoute>
              <HealthLayout
                healthChecks={healthChecks}
                fetchHealthChecks={fetchHealthChecks}
                user={user}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <HealthLayout
                healthChecks={healthChecks}
                fetchHealthChecks={fetchHealthChecks}
                user={user}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
